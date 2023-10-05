
import axios from "axios";

export default async function activeResource(req, res){
      // 環境変数をインポート
    let url = process.env.API_URL + "/activeresource";
    const axiosRes = await axios.get(url);
    const resource = axiosRes.data;

    return res.send(resource);
}