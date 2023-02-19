const oracledb = require('oracledb');

async function Open(sql, binds, autoCommit) {
    const pool = await oracledb.createPool ({
        user: "producao",
        password: "a",
        connectString: "oltp"
    })

    let cnn = await pool.getConnection();
    let result =  cnn.execute(sql, binds, { autoCommit, outFormat:oracledb.OUT_FORMAT_OBJECT });
    await cnn.close();
    return result;
}

exports.Open = Open;