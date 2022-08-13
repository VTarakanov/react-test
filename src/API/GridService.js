import axios from "axios";

export default class GridService {
    static async getAll(limit = 2, page = 1) {
        try {
            const response = await axios.get(`http://localhost:3001/tables/`, {
                params: {
                    _limit: limit,
                    _page: page
                }
            })
            return response;

        } catch (e) {
            console.log('GridService.getAll Error: ', e)
        }

    }
}