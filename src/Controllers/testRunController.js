const { saveLatestTestRun } = require('../Services/testRunJenServices')

async function syncTestRun(req, res) {
    try {
        const result = await saveLatestTestRun()

        res.json({
        message: 'Berhasil menarik data Allure ke database',
        data: result
        })
    } catch (err) {
        console.error("❌ SYNC TEST RUN ERROR:");
        console.error(err.message);
        console.error(err.response?.data);

        res.status(500).json({
            message: 'Gagal sync test run',
            error: err.message
        })
    }

}

module.exports = { syncTestRun }
