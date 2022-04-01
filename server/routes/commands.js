const express = require('express');
const router = express.Router();
const { getRequestingAdmin, getRequestingUser } = require('./auth');

const { Command } = require('../models/Command');
const Excel = require('exceljs');

// Get all commands
router.get('/', async (req, res) => {
    try {
        await getRequestingAdmin(req, res);
        
        const commands = await Command.find();
        res.json(commands);
    } catch(err) {
        res.json({error: err.message});
    }
});

// Dowload report
router.get('/download', async (req, res) => {
    const {dishList, commandList, dateFormated, date, comment} = req.query;

    const dishes = [];
    dishList.forEach(d => {
        let dish = JSON.parse(d);
        dishes.push(dish);
    });

    const commands = [];
    commandList.forEach(c => {
        let command = JSON.parse(c);
        commands.push(command);
    });

    const styleTopCell = (ws, cell) => {
        ws.getCell(cell).font = { bold: true };
        ws.getCell(cell).fill = { 
            type: 'pattern',
            pattern:'solid',
            fgColor:{argb:'8DB4E2'}
        };
        ws.getCell(cell).border = {  
            top: {style:'medium'}, 
            right: {style:'thin'}
        };
    }

    try {
        let workbook = new Excel.Workbook();
        let worksheet = workbook.addWorksheet(`RAPPORT-${date}`,  {
            pageSetup:{paperSize: 9, orientation:'landscape', horizontalCentered: true, verticalCentered: true, fitToPage: true}
        });

        worksheet.pageSetup.margins = {
            left: 0, right: 0,
            top: 0, bottom: 0,
            header: 0, footer: 0
        };

        let letters = ['C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
        let rowIndex = 0;
        
        let columns = [
            { header:  `Vente à emporter - ${dateFormated}`, width: 5 },
            { header: "", width: 12 },
        ];

        worksheet.getCell('A1').alignment = { vertical: 'middle', horizontal: 'center', wrapText: true };
        worksheet.getCell('A1').font = { size: 26, bold: true };
        worksheet.getCell('A1').fill = { 
            type: 'pattern',
            pattern:'solid',
            fgColor:{argb:'8DB4E2'}
        };
        worksheet.getCell('A1').border = {  
            top: {style:'medium'},
            left: {style:'medium'},
            bottom: {style:'medium'},
            right: {style:'medium'} 
        };
        
        worksheet.getRow(1).height = 72;

        worksheet.getCell(`A2`).fill = { type: 'pattern', pattern: 'solid', fgColor: {argb: 'FFFFFF'} }; 
        worksheet.getCell(`B2`).fill = { type: 'pattern', pattern: 'solid', fgColor: {argb: 'FFFFFF'} }; 
        
        for(let i = 0; i < letters.length; i++) {
            if(i < dishes.length + 7) { worksheet.getCell(`${letters[i]}2`).fill = { type: 'pattern', pattern: 'solid', fgColor: {argb: 'FFFFFF'}}  }
        }

        // name & counter 
        worksheet.getCell("A3").value = "#";
        worksheet.getCell("B3").value = "Nom";

        worksheet.getCell('A3').alignment = { vertical: 'middle', horizontal: 'center', wrapText: true };
        worksheet.getCell('B3').alignment = { vertical: 'middle', horizontal: 'center', wrapText: true };
        styleTopCell(worksheet, 'A3');
        worksheet.getCell('A3').border = {top: { style: "medium"}, left: {style: "medium"}, right: {style:'thin'}};
        styleTopCell(worksheet, 'B3');
        
        worksheet.mergeCells('A3:A4');
        worksheet.mergeCells('B3:B4');
        rowIndex += 4;
        // letter index to get the current letter
        let letterIndex = 0;

        dishes.forEach((d, i) => {
            columns.push({ header: "", width: 11});

            styleTopCell(worksheet, `${letters[i]}3`);

            worksheet.getCell(`${letters[i]}3`).value = d.idDish.name;
            worksheet.getCell(`${letters[i]}4`).value = d.idDish.price;
            worksheet.getCell(`${letters[i]}4`).border = { right: {style:'thin'}};
            worksheet.getCell(`${letters[i]}4`).fill =  { 
                type: 'pattern',
                pattern:'solid',
                fgColor:{argb:'C5D9F1'}
            };
            
            worksheet.getCell(`${letters[i]}4`).numFmt = '0.00€';

            worksheet.getCell(`${letters[i]}3`).alignment = { vertical: 'middle', horizontal: 'center', wrapText: true };
            worksheet.getCell(`${letters[i]}4`).alignment = { vertical: 'middle', horizontal: 'center',  wrapText: true };

            letterIndex = i;
        });

        columns.push(  
            { header: "", width: 9},
            { header: "", width: 9},
            { header: "", width: 9},
            { header: "", width: 8},
            { header: "", width: 8},
            { header: "", width: 8},
            { header: `Vente à emporter - ${dateFormated}`, width: 27}
        );

        worksheet.columns = columns;

        worksheet.mergeCells(`A1:${letters[letterIndex+7]}1`);

        // center price
        styleTopCell(worksheet, `${letters[letterIndex+1]}3`);
        worksheet.getCell(`${letters[letterIndex+1]}3`).value = "Montant";
        worksheet.getCell(`${letters[letterIndex+1]}3`).alignment = { vertical: 'middle', horizontal: 'center', wrapText: true };
        worksheet.mergeCells(`${letters[letterIndex+1]}3:${letters[letterIndex+1]}4`);

        // center & merge container
        styleTopCell(worksheet, `${letters[letterIndex+2]}3`);
        worksheet.getCell(`${letters[letterIndex+2]}3`).value = "Boite perso";
        worksheet.getCell(`${letters[letterIndex+2]}3`).alignment = { vertical: 'middle', horizontal: 'center', wrapText: true };
        worksheet.mergeCells(`${letters[letterIndex+2]}3:${letters[letterIndex+2]}4`);

        // center & merge time
        styleTopCell(worksheet, `${letters[letterIndex+3]}3`);
        worksheet.getCell(`${letters[letterIndex+3]}3`).value = "Heure de retrait";
        worksheet.getCell(`${letters[letterIndex+3]}3`).alignment = { vertical: 'middle', horizontal: 'center', wrapText: true };
        worksheet.mergeCells(`${letters[letterIndex+3]}3:${letters[letterIndex+3]}4`);

        // center & merge payement
        styleTopCell(worksheet, `${letters[letterIndex+4]}3`);
        worksheet.getCell(`${letters[letterIndex+4]}3`).border = {left: {style: "medium"}, right: { style: "medium"}, top: { style: "medium"}};
        worksheet.getCell(`${letters[letterIndex+4]}3`).value = "Paiement";
        worksheet.mergeCells(`${letters[letterIndex+4]}3:${letters[letterIndex+6]}3`);

            // add cb espece cheque
        worksheet.getCell(`${letters[letterIndex+4]}4`).value = "CB";
        worksheet.getCell(`${letters[letterIndex+5]}4`).value = "Espèce";
        worksheet.getCell(`${letters[letterIndex+6]}4`).value = "Chèque";

            // borders 
        worksheet.getCell(`${letters[letterIndex+4]}4`).border = {left: {style: "medium"}};
        worksheet.getCell(`${letters[letterIndex+6]}4`).border = {right: {style: "medium"}};

            // color CB/Cheque/Espece
        worksheet.getCell(`${letters[letterIndex+4]}4`).fill =  { 
            type: 'pattern',
            pattern:'solid',
            fgColor:{argb:'C5D9F1'}
        };
        worksheet.getCell(`${letters[letterIndex+5]}4`).fill =  { 
            type: 'pattern',
            pattern:'solid',
            fgColor:{argb:'C5D9F1'}
        };
        worksheet.getCell(`${letters[letterIndex+6]}4`).fill =  { 
            type: 'pattern',
            pattern:'solid',
            fgColor:{argb:'C5D9F1'}
        };

            // alignment for payement column
        worksheet.getCell(`${letters[letterIndex+4]}3`).alignment = { vertical: 'middle', horizontal: 'center', wrapText: true };
        worksheet.getCell(`${letters[letterIndex+4]}4`).alignment = { vertical: 'middle', horizontal: 'center', wrapText: true };
        worksheet.getCell(`${letters[letterIndex+5]}4`).alignment = { vertical: 'middle', horizontal: 'center', wrapText: true };
        worksheet.getCell(`${letters[letterIndex+6]}4`).alignment = { vertical: 'middle', horizontal: 'center', wrapText: true };

        // add comment column & merge + center
        styleTopCell(worksheet, `${letters[letterIndex+7]}3`);
        worksheet.getCell(`${letters[letterIndex+7]}3`).border = {top: { style: "medium"}, right: {style: "medium"}};
        worksheet.getCell(`${letters[letterIndex+7]}3`).value = "Commentaires";
        worksheet.getCell(`${letters[letterIndex+7]}3`).alignment = { vertical: 'middle', horizontal: 'center', wrapText: true };
        worksheet.mergeCells(`${letters[letterIndex+7]}3:${letters[letterIndex+7]}4`);
        
        letterIndex += 7;

        commands.forEach((c, i) => {
            rowIndex++;
            let row = [];
            row.push(i+1, c.user.name);

            // add dish qty to the row
            dishes.forEach(dish => {
                let here = false;
                for(let j = 0; j < c.list.length; j++) {
                    if(c.list[j].dishID._id === dish.idDish._id){
                        row.push(c.list[j].quantity);
                        here = true;
                        break;
                    }
                }
                !here && row.push(" ");
            });

            // add all the other informations
            row.push("", c.container ? "✔" : "", c.timeC, "", "", "", c.comment);
            // save the row in the worksheet
            worksheet.addRow(row);

            // align elemet from the first 2 cells  
            worksheet.getCell(`A${rowIndex}`).alignment = { vertical: 'middle', horizontal: 'center', wrapText: true };
            worksheet.getCell(`A${rowIndex}`).border = { top: { style: "thin"}, left: { style: "medium"}, right: {style:'thin'}  };
            worksheet.getCell(`A${rowIndex}`).font = { bold: true };
            worksheet.getCell(`A${rowIndex}`).fill = {
                type: 'pattern',
                pattern:'solid',
                fgColor:{argb:'8DB4E2'}
            };

            worksheet.getCell(`B${rowIndex}`).alignment = { vertical: 'middle', horizontal: 'center', wrapText: true };
            worksheet.getCell(`B${rowIndex}`).border = { top: { style: "thin"}};

            // align every element in the current row & change format + formulas
            for(let j = 0; j < letters.length; j++) {
                if(j < dishes.length + 7) {
                    worksheet.getCell(`${letters[j]}${rowIndex}`).alignment = { vertical: 'middle', horizontal: 'center', wrapText: true };
                    if(j !== dishes.length + 3 && j !== dishes.length + 4 && j !== dishes.length + 5) {
                        if (j === dishes.length) {     
                            let total = "=";                        
                            for(let k = 0; k < dishes.length; k++) {
                                total += `IFERROR(${letters[j-dishes.length+k]}4*${letters[j-dishes.length+k]}${rowIndex}, 0)`;
                               if(k < dishes.length - 1) total += "+";
                            }
                            worksheet.getCell(`${letters[j]}${rowIndex}`).value =  { formula: total};
                            worksheet.getCell(`${letters[j]}${rowIndex}`).numFmt = '0.00€'
                         }
                        if(j === dishes.length + 6) {
                            worksheet.getCell(`${letters[j]}${rowIndex}`).border = { top: { style: "thin"}, right: { style: "medium"}};
                            worksheet.getCell(`${letters[j]}${rowIndex}`).font = { size: 8 };
                            worksheet.getCell(`${letters[j]}${rowIndex}`).fill = {
                                type: 'pattern',
                                pattern: 'solid',
                                fgColor: {argb: 'FFFFFF'}
                            };
                        }
                        else {
                            worksheet.getCell(`${letters[j]}${rowIndex}`).border = { top: { style: "thin"}};
                            worksheet.getCell(`${letters[j]}${rowIndex}`).fill = {
                                type: 'pattern',
                                pattern: 'solid',
                                fgColor: {argb: 'FFFFFF'}
                            };   
                        }
                    }
                    else {
                        worksheet.getCell(`${letters[j]}${rowIndex}`).alignment = { vertical: 'middle', horizontal: 'center', wrapText: true };
                        if(j === dishes.length + 3) worksheet.getCell(`${letters[j]}${rowIndex}`).border = { top: { style: "thin"}, left: {style: "medium"}, right: {style: "thin"}};
                        else if(j === dishes.length + 5) worksheet.getCell(`${letters[j]}${rowIndex}`).border = { top: { style: "thin"}, left: {style: "thin"}, right: {style: "medium"}};
                        else worksheet.getCell(`${letters[j]}${rowIndex}`).border = { top: { style: "thin"}, left: {style: "thin"}, right: {style: "thin"}};
                    }                   
                }
            }
        });

        // add blank lines change the number to have more (in the for loop & the if statement) default value = 5
        for(let i = 1; i <= 5; i++) {
            rowIndex++;
            let row = [];
            row.push(commands.length + i);
            worksheet.addRow(row);

            if(i < 5) {
                // align elemet from the first 2 cells  
                worksheet.getCell(`A${rowIndex}`).alignment = { vertical: 'middle', horizontal: 'center', wrapText: true };
                worksheet.getCell(`A${rowIndex}`).border = { top: { style: "thin"}, bottom: { style: "thin"}, left: { style: "medium"}, right: {style:'thin'}};
                worksheet.getCell(`A${rowIndex}`).font = { bold: true };
                worksheet.getCell(`A${rowIndex}`).fill = {
                    type: 'pattern',
                    pattern:'solid',
                    fgColor:{argb:'8DB4E2'}
                };

                worksheet.getCell(`B${rowIndex}`).alignment = { vertical: 'middle', horizontal: 'center', wrapText: true };
                worksheet.getCell(`B${rowIndex}`).border = { top: { style: "thin"}, bottom: { style: "thin"} };

                for(let j = 0; j < letters.length; j++) {
                    if(j < dishes.length + 7) {
                        worksheet.getCell(`${letters[j]}${rowIndex}`).alignment = { vertical: 'middle', horizontal: 'center', wrapText: true };
                        if(j !== dishes.length + 3 && j !== dishes.length + 4 && j !== dishes.length + 5) {
                            if(j === dishes.length + 6) {
                                worksheet.getCell(`${letters[j]}${rowIndex}`).border = { top: { style: "thin"}, bottom: { style: "thin"}, right: { style: "medium"}};
                                worksheet.getCell(`${letters[j]}${rowIndex}`).fill = {
                                    type: 'pattern',
                                    pattern: 'solid',
                                    fgColor: {argb: 'FFFFFF'}
                                };
                                worksheet.getCell(`${letters[j]}${rowIndex}`).font = { size: 8 };
                            }
                            else {
                                worksheet.getCell(`${letters[j]}${rowIndex}`).border = { top: { style: "thin"}, bottom: { style: "thin"}};
                                worksheet.getCell(`${letters[j]}${rowIndex}`).fill = {
                                    type: 'pattern',
                                    pattern: 'solid',
                                    fgColor: {argb: 'FFFFFF'}
                                };   
                            }
                        }
                        else {
                            worksheet.getCell(`${letters[j]}${rowIndex}`).alignment = { vertical: 'middle', horizontal: 'center', wrapText: true };
                            if(j === dishes.length + 3) worksheet.getCell(`${letters[j]}${rowIndex}`).border = { top: { style: "thin"}, bottom: { style: "thin"}, left: {style: "medium"}, right: {style: "thin"}};
                            else if(j === dishes.length + 5) worksheet.getCell(`${letters[j]}${rowIndex}`).border = { top: { style: "thin"}, bottom: { style: "thin"}, left: {style: "thin"}, right: {style: "medium"}};
                            else worksheet.getCell(`${letters[j]}${rowIndex}`).border = { top: { style: "thin"}, bottom: { style: "thin"}, left: {style: "thin"}, right: {style: "thin"}};
                        }                   
                    }
                }
            }
            else {
                // align elemet from the first 2 cells  
                worksheet.getCell(`A${rowIndex}`).alignment = { vertical: 'middle', horizontal: 'center', wrapText: true };
                worksheet.getCell(`A${rowIndex}`).border = { top: { style: "thin"}, bottom: { style: "medium"}, left: { style: "medium"}, right: {style: "thin"} };
                worksheet.getCell(`A${rowIndex}`).font = { bold: true };
                worksheet.getCell(`A${rowIndex}`).fill = {
                    type: 'pattern',
                    pattern:'solid',
                    fgColor:{argb:'8DB4E2'}
                };

                worksheet.getCell(`B${rowIndex}`).alignment = { vertical: 'middle', horizontal: 'center', wrapText: true };
                worksheet.getCell(`B${rowIndex}`).border = { top: { style: "thin"}, bottom: { style: "medium"} };

                for(let j = 0; j < letters.length; j++) {
                    if(j < dishes.length + 7) {
                        worksheet.getCell(`${letters[j]}${rowIndex}`).alignment = { vertical: 'middle', horizontal: 'center', wrapText: true };
                        if(j !== dishes.length + 3 && j !== dishes.length + 4 && j !== dishes.length + 5) {
                            if(j === dishes.length + 6) {
                                worksheet.getCell(`${letters[j]}${rowIndex}`).border = { top: { style: "thin"}, bottom: { style: "medium"}, right: { style: "medium"}};
                                worksheet.getCell(`${letters[j]}${rowIndex}`).fill = {
                                    type: 'pattern',
                                    pattern: 'solid',
                                    fgColor: {argb: 'FFFFFF'}
                                };
                                worksheet.getCell(`${letters[j]}${rowIndex}`).font = { size: 8 };
                            }
                            else {
                                worksheet.getCell(`${letters[j]}${rowIndex}`).border = { top: { style: "thin"}, bottom: { style: "medium"}};
                                worksheet.getCell(`${letters[j]}${rowIndex}`).fill = {
                                    type: 'pattern',
                                    pattern: 'solid',
                                    fgColor: {argb: 'FFFFFF'}
                                };   
                            }
                        }
                        else {
                            worksheet.getCell(`${letters[j]}${rowIndex}`).alignment = { vertical: 'middle', horizontal: 'center', wrapText: true };
                            if(j === dishes.length + 3) worksheet.getCell(`${letters[j]}${rowIndex}`).border = { top: { style: "thin"}, bottom: { style: "thin"}, left: {style: "medium"}, right: {style: "thin"}};
                            else if(j === dishes.length + 5) worksheet.getCell(`${letters[j]}${rowIndex}`).border = { top: { style: "thin"}, bottom: { style: "thin"}, left: {style: "thin"}, right: {style: "medium"}};
                            else worksheet.getCell(`${letters[j]}${rowIndex}`).border = { top: { style: "thin"}, bottom: { style: "thin"}, left: {style: "thin"}, right: {style: "thin"}};
                        }                   
                    }
                }
            }
        }

        for(let i=0; i < 2; i++) {
            rowIndex++;
            worksheet.getCell(`A${rowIndex}`).fill = {
                type: 'pattern',
                pattern: 'solid',
                fgColor: {argb: 'FFFFFF'}
            };
            worksheet.getCell(`B${rowIndex}`).fill = {
                type: 'pattern',
                pattern: 'solid',
                fgColor: {argb: 'FFFFFF'}
            };  
            if(i < 1) {
                for(let j = 0; j < letters.length; j++) {
                    if(j < dishes.length + 7) {
                        if(j === dishes.length + 3 || j === dishes.length + 4 || j === dishes.length + 5) {
                            worksheet.getCell(`${letters[j]}${rowIndex}`).alignment = { vertical: 'middle', horizontal: 'center', wrapText: true };
                            if(j === dishes.length + 3) worksheet.getCell(`${letters[j]}${rowIndex}`).border = { top: { style: "thin"}, bottom: { style: "thin"}, left: {style: "medium"}, right: {style: "thin"}};
                            else if(j === dishes.length + 5) worksheet.getCell(`${letters[j]}${rowIndex}`).border = { top: { style: "thin"}, bottom: { style: "thin"}, left: {style: "thin"}, right: {style: "medium"}};
                            else worksheet.getCell(`${letters[j]}${rowIndex}`).border = { top: { style: "thin"}, bottom: { style: "thin"}, left: {style: "thin"}, right: {style: "thin"}};
                        }
                        else {
                            worksheet.getCell(`${letters[j]}${rowIndex}`).fill = {
                                type: 'pattern',
                                pattern: 'solid',
                                fgColor: {argb: 'FFFFFF'}
                            };  
                        }
        
                    }
                }
            }
            else {
                for(let j = 0; j < letters.length; j++) {
                    if(j < dishes.length + 7) {
                        if(j === dishes.length + 3 || j === dishes.length + 4 || j === dishes.length + 5) {
                            worksheet.getCell(`${letters[j]}${rowIndex}`).alignment = { vertical: 'middle', horizontal: 'center', wrapText: true };

                            if(j === dishes.length +3) worksheet.mergeCells((`${letters[j]}${rowIndex}:${letters[j+2]}${rowIndex}`));
                            worksheet.getCell(`${letters[j]}${rowIndex}`).border = { top: { style: "thin"}, bottom: { style: "medium"}, left: {style: "medium"}, right: {style: "medium"}};
                            worksheet.getCell(`${letters[j]}${rowIndex}`).fill = {
                                type: 'pattern',
                                pattern:'solid',
                                fgColor:{argb:'8DB4E2'}
                            };
                        }
                        else {
                            worksheet.getCell(`${letters[j]}${rowIndex}`).fill = {
                                type: 'pattern',
                                pattern: 'solid',
                                fgColor: {argb: 'FFFFFF'}
                            };  
                        }
        
                    }
                }
            }
        }        

        worksheet.getCell(`B${rowIndex}`).value = "Totaux";
        worksheet.getCell(`B${rowIndex}`).alignment = { vertical: 'middle', horizontal: 'center', wrapText: true };
        worksheet.getCell(`B${rowIndex}`).border = {left: {style: "medium"}, top: {style: "medium"}, right: {style: "thin"}, bottom: {style: "medium"}};
        worksheet.getCell(`B${rowIndex}`).fill = {
            type: 'pattern',
            pattern:'solid',
            fgColor:{argb:'8DB4E2'}
        };
        worksheet.getCell(`B${rowIndex}`).font = { bold: true };

        for(let i = 0; i < letters.length; i++) {
            if(i <= dishes.length) {
                worksheet.getCell(`${letters[i]}${rowIndex}`).value = {formula: `=IF(SUM(${letters[i]}5:${letters[i]}${rowIndex-2})<>0, SUM(${letters[i]}5:${letters[i]}${rowIndex-2}), "")`};
                worksheet.getCell(`${letters[i]}${rowIndex}`).alignment = { vertical: 'middle', horizontal: 'center', wrapText: true };
                worksheet.getCell(`${letters[i]}${rowIndex}`).border = {left: {style: "thin"}, top: {style: "medium"}, right: {style: "thin"}, bottom: {style: "medium"}};

                if(i === dishes.length) {
                    worksheet.getCell(`${letters[i]}${rowIndex}`).numFmt = "0.00€";
                    worksheet.getCell(`${letters[i]}${rowIndex}`).border = {left: {style: "thin"}, top: {style: "medium"}, right: {style: "medium"}, bottom: {style: "medium"}};
                    worksheet.getCell(`${letters[i]}${rowIndex}`).fill = {
                        type: 'pattern',
                        pattern:'solid',
                        fgColor:{argb:'8DB4E2'}
                    };
                    worksheet.getCell(`${letters[i]}${rowIndex}`).font = {bold: true};
                }
            }
        }

        worksheet.getRow(rowIndex).height = 30;
        
        // jump 2 rows + fill with white
        for(let j = 0; j < 4; j++) {    
            rowIndex++;
            worksheet.getCell(`A${rowIndex}`).fill = { type: 'pattern', pattern: 'solid', fgColor: {argb: 'FFFFFF'} }; 
            worksheet.getCell(`B${rowIndex}`).fill = { type: 'pattern', pattern: 'solid', fgColor: {argb: 'FFFFFF'} }; 

            for(let i = 0; i < letters.length; i++) {
                if(i < dishes.length + 7) {
                    worksheet.getCell(`${letters[i]}${rowIndex}`).fill = {
                        type: 'pattern',
                        pattern: 'solid',
                        fgColor: {argb: 'FFFFFF'}
                    }; 
                }
            }
        }
        
        worksheet.getCell(`A${rowIndex-1}`).value = "Commentaire : "
        worksheet.getCell(`A${rowIndex-1}`).font = {bold: true}



        worksheet.getCell(`A${rowIndex}`).alignment = { vertical: 'middle', horizontal: 'center', wrapText: true };
        worksheet.mergeCells(`A${rowIndex}:${letters[dishes.length+6]}${rowIndex}`);
        worksheet.getCell(`A${rowIndex}`).value = comment;
        worksheet.getCell(`A${rowIndex}`).border = { top: { style: "medium"}, right: {style: "medium"}, bottom: {style: "medium"}, left: {style: "medium"}};
        worksheet.getRow(rowIndex).height = 95;

        // Set Print Area for a sheet
        worksheet.pageSetup.printArea = `A1:${letters[letterIndex]}${rowIndex}`;

        res.setHeader("Content-Type", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
        res.setHeader("Content-Disposition", "attachment; filename=Report.xlsx");
        
        workbook.xlsx.write(res).then(function () {
            res.status(200).end();
        });
    } catch (err) {
        console.log(err);
        res.json({err});
    }
});

// Get all visible commands
router.get('/visible', async (req, res) => {
    try {
        await getRequestingAdmin(req, res);

        const commands = await Command.find({visible: true});
        res.json(commands);
    } catch(err) {
        res.json({error: err.message});
    }
});

// Get command by date
router.get('/:dateC', async (req, res) => {
    try {
        await getRequestingAdmin(req, res);

        const command = await Command.find({ dateC: req.params.dateC }).populate('user').populate({
            path : 'list',
            populate : {
              path : 'dishID'
            }
        });
        res.json(command);
    } catch(err) {
        res.json({error: err.message});
    }
});

// Get command by user
router.get('/user/:user', async (req, res) => {
    try {
        await getRequestingUser(req, res);

        const command = await Command.find({ user: req.params.user});
        res.json(command);
    } catch(err) {
        res.json({error: err.message});
    }
});


// Create a command
router.post('/', async (req, res) => {
    const {user, dateC, timeC, paid, container, comment, total} = req.body;
    const command = new Command({
        user: user,
        dateC: dateC,
        timeC: timeC,
        paid: paid,
        container: container,
        comment: comment,
        total: total
    });

    try {
        await getRequestingUser(req, res); 
        
        const savedCommand = await command.save();
        res.json(savedCommand);
    } catch(err) {
        console.log(err);
        res.json({error: err.message});
    }
});

// Delete a command
router.delete("/:commandId", async (req, res) => {
    try {
        await getRequestingAdmin(req, res);

        const commandToDelete = await Command.findByIdAndDelete(req.params.commandId);
        res.json(commandToDelete);
    } catch(err) {
        res.json({error: err.message});
    }
});

// Update a command
router.patch('/:commandId', async (req, res) => {
    const { timeC, paid, container, comment, total } = req.body;
    try {
        await getRequestingAdmin(req, res);

        const commandToUpdate = await Command.updateOne(
            { _id: req.params.commandId },
            {
                timeC : timeC,
                paid : paid,
                container: container, 
                comment: comment,
                total: total
            }
        );
        res.json(commandToUpdate);
    } catch(err) {
        res.json({error: err.message});
    }
});


module.exports = router;