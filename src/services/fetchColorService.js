// import axios from 'axios';
import axiosWithAuth from '../helpers/axiosWithAuth';

const  fetchColorService =  async () => {
    // const token = localStorage.getItem("token");
    // let res = await axios.get('http://localhost:5000/api/colors', {headers: {authorization: token} });

    const instance =  axiosWithAuth();
    try {
        let res = await instance.get("/colors");
        // console.log("in fetchColors res:", res);
        return res.data;
    } 
    catch {
        console.log("Error in fetching colors");
        return [];
    }
}


export default fetchColorService;