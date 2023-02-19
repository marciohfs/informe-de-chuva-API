const { Router } = require('express');
const { AQ_DEQ_NAV_NEXT_TRANSACTION } = require('oracledb');
const router = Router();
const BD = require('../configdb/oracledb');
const sendEmail = require('../email/nodemail');

//READ
router.get("/chuvaUSL/:codport", async (req, res) => {
    const { codport } = req.params;
    
    sql = "SELECT * FROM USLAGENDAU WHERE ATIVO = 'S' AND NUMERO = :codport ORDER BY NUMERO";
    
    let result = await BD.Open(sql, [codport], true);
    
    if (result.rows.length == 0) {
        return res.status(404).json();
    } else {
        return res.status(200).json(result.rows);
    }
    
})

//CREATE
router.post('/addChuvaUSL', async (req, res) => {
    try {
        const { data_ano, data_dia, hora, cod_porteiro, uslmm, fstmm, boamm, empmm, portnome, data_dia2 } = req.body;

        let consult = "SELECT * FROM USLCHUVA WHERE DATA_DIA = TO_DATE(:data_dia, 'YYYY/MM/DD')"

        let result = await BD.Open(consult, [data_dia], true);

        if (result.rows.length > 0) {
            return res.status(400).json(); 
        }
    
        sql = "INSERT INTO USLCHUVA(DATA_ANO, DATA_DIA, HORA, COD_PORTEIRO, USLMM, FSTMM, BOAMM, EMPMM) VALUES (:data_ano, TO_DATE(:data_dia, 'YYYY/MM/DD'), :hora, :cod_porteiro, :uslmm, :fstmm, :boamm, :empmm)";
        
        await BD.Open(sql, [data_ano, data_dia, hora, cod_porteiro, uslmm, fstmm, boamm, empmm], true);
        
        await sendEmail(portnome, hora, data_dia2, uslmm, fstmm, boamm, empmm);
        return res.status(200).json({
            "data_ano": data_ano,
            "data_dia": data_dia,
            "hora": hora,
            "cod_porteiro": cod_porteiro,
            "uslmm": uslmm,
            "fstmm": fstmm,
            "boamm": boamm,
            "empmm": empmm,
            "portnome": portnome,
            "data_dia2": data_dia2,
        });

    } catch {
        return res.status(400).json();
    }
    
})

//UPDATE
// router.put("/updateChuvaUSL", async (req, res) => {
//     const { data_ano, data_dia, hora, cod_porteiro, uslmm, fstmm, boamm, empmm } = req.body;

//     sql = "UPDATE USLCHUVA SET DATA_ANO=:data_ano, DATA_DIA=TO_DATE(:data_dia, 'YYYY/MM/DD'), HORA=:hora, COD_PORTEIRO=:cod_porteiro, USLMM=:uslmm, FSTMM=:fstmm, BOAMM=:boamm, EMPMM=:empmm WHERE DATA_DIA=TO_DATE(:data_dia, 'YYYY/MM/DD')";

//     await BD.Open(sql, [data_ano, data_dia, hora, cod_porteiro, uslmm, fstmm, boamm, empmm], true);

//     res.status(200).json({
//         "data_ano": data_ano,
//         "data_dia": data_dia,
//         "hora": hora,
//         "cod_porteiro": cod_porteiro,
//         "uslmm": uslmm,
//         "fstmm": fstmm,
//         "boamm": boamm,
//         "empmm": empmm,
//     })

// })


//DELETE
router.delete("/deleteChuvaUSL/:data_dia", async (req, res) => {
    const { data_dia } = req.params;

    sql = "DELETE FROM USLCHUVA WHERE DATA_DIA=TO_DATE(:data_dia, 'YYYY/MM/DD')";

    await BD.Open(sql, [data_dia], true);

    res.status(204).json()
})


module.exports = router;