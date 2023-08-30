const invoiceTemplate = (body) => {
    const today = new Date();
    return `<!doctype html>
    <html>
    
    <head>
        <meta charset="utf-8">
        <title>PDF Result Template</title>
        <style>
            .invoice-box {
                max-width: 1000px;
                margin: auto;
                padding: 30px;
                border: 1px solid #eee;
                box-shadow: 0 0 10px rgba(0, 0, 0, .15);
                font-size: 16px;
                line-height: 24px;
                font-family: 'Helvetica Neue', 'Helvetica';
                color: #555;
            }
    
            .margin-top {
                margin-top: 50px;
            }
    
            .justify-center {
                text-align: center;
            }
    
            .invoice-box table {
                width: 100%;
                line-height: inherit;
                text-align: left;
            }
    
            .invoice-box table td {
                padding: 5px;
                vertical-align: top;
            }
    
            .invoice-box table tr td:nth-child(2) {
                text-align: right;
            }
    
            .invoice-box table tr.top table td {
                padding-bottom: 20px;
            }
    
            .invoice-box table tr.top table td.title {
                font-size: 45px;
                line-height: 45px;
                color: #333;
            }
    
            .invoice-box table tr.information table td {
                padding-bottom: 40px;
            }
    
            .invoice-box table tr.heading td {
                background: #eee;
                border-bottom: 1px solid #ddd;
                font-weight: bold;
            }
    
            .invoice-box table tr.details td {
                padding-bottom: 20px;
            }
    
            .invoice-box table tr.item td {
                border-bottom: 1px solid #eee;
            }
    
            .invoice-box table tr.item.last td {
                border-bottom: none;
            }
    
            .invoice-box table tr.total td:nth-child(2) {
                border-top: 2px solid #eee;
                font-weight: bold;
            }
    
            @media only screen and (max-width: 600px) {
                .invoice-box table tr.top table td {
                    width: 100%;
                    display: block;
                    text-align: center;
                }
    
                .invoice-box table tr.information table td {
                    width: 100%;
                    display: block;
                    text-align: center;
                }
            }
        </style>
    </head>
    
    <body>
        <div class="invoice-box">
            <table cellpadding="0" cellspacing="0">
                <tr class="top">
                    <td colspan="2">
                        <table>
                            <tr>
                                <td class="title"><img src="https://i.imgur.com/GJylxm5.png"
                                        style="width:100%; max-width:256px;"></td>
                               
                            </tr>
                        </table>
                    </td>
                </tr>
                <tr class="information">
                    <td colspan="2">
                        <table>
                            <tr>
                                <td>
                                    <p>${body.clientFirstName} ${body.clientLastName}<br>
                                        ${body.clientAddress}<br>
                                    </p>
                                </td>
                                <td>
                                    <p>TELEFOON: ${body.businessPhone}<br>
                                        FAX: ${body.businessFax}<br>
                                        E-MAIL: ${body.businessEmail}<br>
                                        ADRES: ${body.businessAddress}<br>
                                        INTERNET: ${body.businessWebsite}
                                    </p>
                                </td>
                            </tr>
                        </table>
                    </td>
                </tr>
                <tr class="information">
                    <td colspan="2">
                        <table>
                            <tr>
                                <td>
                                    <p>Declaratiedatum: ${body.invoiceDate}<br>
                                        Declaratiekenmerk: ${body.declaratiekenmerk}<br>
                                        Zaakkenmerk: ${body.title}<br>
                                    </p>
                                </td>
    
                            </tr>
                        </table>
                    </td>
                </tr>
                <hr />
                <tr class="information">
                    <td colspan="2">
                        <table>
                            <tr>
                                <td>
                                    <p>Ten behoeve van de door ons (te) verrichte(n) werkzaamheden in uw dossier verzoek ik
                                        u<br>
                                        onderstaand bedrag binnen ${body.paymentPeriode} dagen te voldoen op onderstaand
                                        rekeningnummer ten<br>
                                        name van ${body.businessName} onder vermelding van het declaratiekenmerk.</p>
                                </td>
    
                            </tr>
                        </table>
                    </td>
                </tr>
                <tr class="heading">
                    <td>DECLARATIE</td>
                    <td>Price</td>
                </tr>
                ${body.priceTableString}
                <tr class="item">
                    <td>Honorarium ${body.formattedTotalTime} - €${body.hourRate} p.u:</td>
                    <td>€${body.totalHourCost}</td>
                </tr>
                <tr class="item">
                    <td>BTW 21%:</td>
                    <td>€${body.btwTotal}</td>
                </tr>
                <tr class="heading">
                    <td>Total</td>
                    <td>€${body.finalPrice}</td>
                </tr>
            </table>
            <br />
            <div class="">
                <table class="invoice-table">
                    <tr>
                        <th>Rekeningnummer:</th>
                        <td>${body.bankNumber}</td>
                    </tr>
                    <tr>
                        <th>T.n.v:</th>
                        <td>${body.businessName}</td>
                    </tr>
                    <tr>
                        <th>KvK-nummer:</th>
                        <td>${body.kvkNumber}</td>
                    </tr>
                    <tr>
                        <th>BTW-nummer:</th>
                        <td>${body.btwNumber}</td>
                    </tr>
                </table>
            </div>
        </div>
    
    
    </body>
    
    </html>`;
};

module.exports = invoiceTemplate;