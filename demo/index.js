const {app, BrowserWindow, ipcMain, screen} = require('electron');
const path = require("path");
const {PosPrinter} = require("../dist/index");



const createWindow = () => {
    const size = screen.getPrimaryDisplay().size;
    console.log(size);
    const win = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false
        }
    })

    win.loadFile('index.html');
    // open deve tools
    win.webContents.openDevTools();
}

app.whenReady().then(() => {
    createWindow();
});

ipcMain.on('test-print', testPrint);


function testPrint() {
    const options = {
        preview: true,               //  width of content body
        margin: 'auto',            // margin of content body
        copies: 1,                    // Number of copies to print
        printerName: 'XP-80C',        // printerName: string, check with webContent.getPrinters()
        timeOutPerLine: 1000,
        pageSize: '80mm'  // page size
    }

    const data = [
        {
            type: 'table',
            style: {border: '1px solid #ddd'},             // style the table
            // list of the columns to be rendered in the table header
            tableHeader: [{type: 'text', value: 'People'}, {
                type: 'image',
                url: 'https://randomuser.me/api/portraits/men/13.jpg'
            }],
            // multidimensional array depicting the rows and columns of the table body
            tableBody: [
                [{type: 'text', value: 'Marcus'}, {
                    type: 'image',
                    url: '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',
                    format: 'image/png'
                }],
                [{type: 'text', value: 'Boris'}, {
                    type: 'image',
                    url: 'https://randomuser.me/api/portraits/men/41.jpg'
                }],
                [{type: 'text', value: 'Andrew'}, {
                    type: 'image',
                    url: 'https://randomuser.me/api/portraits/men/23.jpg'
                }],
                [{type: 'text', value: 'Tyresse'}, {
                    type: 'image',
                    url: 'https://randomuser.me/api/portraits/men/53.jpg'
                }],
            ],
            // list of columns to be rendered in the table footer
            tableFooter: [{type: 'text', value: 'People'}, 'Image'],
            // custom style for the table header
            tableHeaderStyle: {backgroundColor: 'red', color: 'white'},
            // custom style for the table body
            tableBodyStyle: {'border': '0.5px solid #ddd'},
            // custom style for the table footer
            tableFooterStyle: {backgroundColor: '#000', color: 'white'},
        },
        {
            type: 'image',
            url: 'https://randomuser.me/api/portraits/men/43.jpg',     // file path
            position: 'center',                                  // position of image: 'left' | 'center' | 'right'
            width: '60px',                                           // width of image in px; default: auto
            height: '60px',
        },
        {
            type: 'text',                                       // 'text' | 'barCode' | 'qrCode' | 'image' | 'table
            value: 'SAMPLE HEADING',
            style: {fontWeight: "700", textAlign: 'center', fontSize: "24px"}
        },
        {
            type: 'text',                       // 'text' | 'barCode' | 'qrCode' | 'image' | 'table'
            value: 'Secondary text',
            style: {textDecoration: "underline", fontSize: "10px", textAlign: "center", color: "red"}
        },
        {
            type: 'barCode',
            value: '023456789010',
            height: 40,                     // height of barcode, applicable only to bar and QR codes
            width: 2,                       // width of barcode, applicable only to bar and QR codes
            displayValue: true,             // Display value below barcode
            fontsize: 12,
        },
        {
            type: 'qrCode',
            value: 'https://github.com/Hubertformin/electron-pos-printer',
            height: 55,
            width: 55,
            position: 'right'
        },
        {
            type: 'table',
            // style the table
            style: {border: '1px solid #ddd'},
            // list of the columns to be rendered in the table header
            tableHeader: ['Animal', 'Age'],
            // multidimensional array depicting the rows and columns of the table body
            tableBody: [
                ['Cat', 2],
                ['Dog', 4],
                ['Horse', 12],
                ['Pig', 4],
            ],
            // list of columns to be rendered in the table footer
            tableFooter: ['Animal', 'Age'],
            // custom style for the table header
            tableHeaderStyle: {backgroundColor: '#000', color: 'white'},
            // custom style for the table body
            tableBodyStyle: {'border': '0.5px solid #ddd'},
            // custom style for the table footer
            tableFooterStyle: {backgroundColor: '#000', color: 'white'},
        }
    ]

    try {
        PosPrinter.print(data, options)
            .then(() => console.log('done'))
            .catch((error) => {
                console.error(error);
            });
    } catch (e) {
        console.log(PosPrinter)
        console.log(e);
    }
}