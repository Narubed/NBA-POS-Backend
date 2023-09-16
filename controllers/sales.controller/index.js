const { Report, validate } = require("../../models/report.model");
const dayjs = require('dayjs')

exports.findByBranch = async (req, res) => {
    try {
        const {
            branch_id,
            date_start,
            date_end
        } = req.body
        const dateStart = dayjs(date_start).format()
        const dateEnd = dayjs(date_end).add(1, 'day').format()
        console.log(dateStart)
        console.log(dateEnd)
        const findAllReport = await Report.find({
            rif_branch_id: branch_id,
            report_timestamp: {
                "$gte": dateStart,
                "$lte": dateEnd
            }
        })
        if (findAllReport.length > 0) {
            const reportList = []
            findAllReport.forEach((element) => {
                element.report_detail.map((item) => {
                    const idx = reportList.findIndex((item2) => item2.product_id === item.product_id)
                    if (idx === -1) {
                        reportList.push(item)
                    } else {
                        reportList[idx].amount += item.amount
                        reportList[idx].product_discount += item.product_discount
                        // reportList[idx].product_cost += item.product_cost
                        // reportList[idx].product_price += item.product_price
                    }
                })
            })
            res.status(200).send({ status: true, message: `Successfully`, data: reportList })
        } else {
            res.status(200).send({
                message: `can't query for all reports`,
                data: [],
                status: false,
            });
        }


    } catch (error) {
        res.status(500).send({
            message: "มีบางอย่างผิดพลาด",
            status: false,
        });
    }
};

