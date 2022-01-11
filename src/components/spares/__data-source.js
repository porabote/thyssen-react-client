import Api from '@services/api-service'

const fetchData = (page, where, include, callback) => {

    Api
        .get(`/api/spares/get/`, {
        query: {
            where: {
                '=': this.state.filter.left
            },
            include: [
                'user'
            ],
            page: this.state.page
        }
        }).then((response) => {
            callback(response)
        })
}

export { fetchData }