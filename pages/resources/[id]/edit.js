
import Layout from "components/Layout";
import ResourceForm from "components/ResourceForm";
import axios from "axios";

const ResoueceEdit =({resource})=>{

    const updateResource = (formData) => {
        axios.patch("/api/resources", formData )
            .then(_ => alert("updated!"))
            .catch(err => alert(err?.response?.data));
    }

    return(
        <Layout>
            <div className="container">
                <div className="columns">
                    <div className="column is-8 is-offset-2">
                        <ResourceForm
                        initialData={resource}
                            onFormSubmit={updateResource}
                        />
                    </div>
                </div>
            </div>
        </Layout>
    )
}



export async function getServerSideProps({params}){

    // 環境変数をインポート
    let url = process.env.API_URL + "/resources";

    const dataRes = await fetch(url+"/"+params.id);
    const data = await dataRes.json();
 
    console.log(data);
 
    return{
        props:{
            resource: data
        }
    }
 }
 




export default ResoueceEdit;