const { PDFDocument } = require('pdf-lib');
const fs = require('fs');
const pdf = require('html-pdf');
const path = require('path'); // Add this import at the beginning

const hourSpecTemplate = require('../PDFTemplates/hour_spec_template')
const invoiceTemplate = require('../PDFTemplates/invoice_template')

const { makeId } = require('../utils/stringUtils');

// Function to create an individual PDF with provided template and data
async function createPdf(template, fileName) {
    return new Promise((resolve, reject) => {
        pdf.create(template, {}).toFile(fileName, (err, res) => {
            if (err) {
                reject(err);
            }
            resolve(res.filename);
        });
    });
}

// POST: create and send PDF
exports.createPdfAndSend = async (req, res) => {
    try {

        // Generate unique file names for invoice and hours PDFs
        const invoiceFileName = `result-invoice-${makeId(5)}.pdf`;
        const hoursFileName = `result-hours-${makeId(5)}.pdf`;

        // Create invoice and hours PDFs in parallel
        const [invoiceFile, hoursFile] = await Promise.all([
            createPdf(invoiceTemplate(req.body), invoiceFileName),
            createPdf(hourSpecTemplate(req.body), hoursFileName)
        ]);

        // Read PDF files as buffers
        const pdfBuffer1 = fs.readFileSync(invoiceFile);
        const pdfBuffer2 = fs.readFileSync(hoursFile);
        const pdfsToMerge = [pdfBuffer1, pdfBuffer2];

        // Merge PDFs into a single PDF
        const mergedPdf = await PDFDocument.create();
        for (const pdfBytes of pdfsToMerge) {
            const pdf = await PDFDocument.load(pdfBytes);
            const copiedPages = await mergedPdf.copyPages(pdf, pdf.getPageIndices());
            copiedPages.forEach(page => mergedPdf.addPage(page));
        }
        const mergedPdfBuffer = await mergedPdf.save();

        // Save the merged PDF
        const mergedFileName = `merged-${makeId(5)}.pdf`;
        fs.writeFileSync(mergedFileName, mergedPdfBuffer);

        // Construct the absolute path to the merged PDF file
        const absoluteFilePath = path.join(__dirname, '..', mergedFileName);

        // Delete the temporary PDF files
        fs.unlinkSync(invoiceFile);
        fs.unlinkSync(hoursFile);

        // Send the merged PDF to the client
        res.sendFile(absoluteFilePath, (err) => {
            if (err) {
                console.error('Error sending file:', err);
            } else {
                // Delete the merged PDF file
                fs.unlink(absoluteFilePath, (deleteErr) => {
                    if (deleteErr) {
                        console.error('Error deleting file:', deleteErr);
                    } else {
                        console.log('File deleted:', mergedFileName);
                    }
                });
            }
        });

    } catch (error) {
        res.send(Promise.reject());
        console.log(error)
    }
};
