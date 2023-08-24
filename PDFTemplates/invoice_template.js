const invoiceTemplate = ({ name, price1, price2 }) => {
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
                                        style="width:100%; max-width:156px;"></td>
                                <td>
                                    Datum: ${`${today.getDate()}. ${today.getMonth() + 1}. ${today.getFullYear()}.`}
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
                                    <p>NAAM ACHTERNAAM<br>
                                        ADRES<br>
                                        POSTCODE STAD</p>
                                </td>
                                <td>
                                    <p>TELEFOON: 020 717 31 10<br>
                                        FAX: 020 717 31 11<br>
                                        E-MAIL: info@arslanersoy.nl<br>
                                        ADRES: Meer en Vaart 160<br>
                                        1068 ZZ Amsterdam<br>Nederland<br>
                                        INTERNET: www.arslanersoy.nl
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
                                    <p>Declaratiedatum: ${`${today.getDate()}. ${today.getMonth() + 1}.
                                        ${today.getFullYear()}.`}<br>
                                        Declaratiekenmerk: Dossiernummer<br>
                                        Zaakkenmerk: Dossiernaam<br>
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
                                        onderstaand bedrag binnen 14 dagen te voldoen op onderstaand rekeningnummer ten<br>
                                        name van Arslan & Ersoy Advocaten onder vermelding van het declaratiekenmerk.</p>
                                </td>
    
                            </tr>
                        </table>
                    </td>
                </tr>
                <tr class="heading">
                    <td>DECLARATIE</td>
                    <td>Price</td>
                </tr>
                <tr class="item">
                    <td>Honorarium:</td>
                    <td>${price1}$</td>
                </tr>
                <tr class="item">
                    <td>BTW:</td>
                    <td>${price2}$</td>
                </tr>
            </table>
            <br />
            <h1 class="justify-center">Totaal te voldoen: ${parseInt(price1) + parseInt(price2)}$</h1>
            <div class="">
                <table class="invoice-table">
                    <tr>
                        <th>Rekeningnummer:</th>
                        <td>NL41 INGB 0007 0793 12</td>
                    </tr>
                    <tr>
                        <th>T.n.v:</th>
                        <td>Arslan & Ersoy Advocaten</td>
                    </tr>
                    <tr>
                        <th>KvK-nummer:</th>
                        <td>56320744</td>
                    </tr>
                    <tr>
                        <th>BTW-nummer:</th>
                        <td>NL852072910.B.01</td>
                    </tr>
                </table>
            </div>
        </div>
    
    
    </body>
    
    </html>`;
};

module.exports = invoiceTemplate;