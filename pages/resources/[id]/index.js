import Layout from "components/Layout";
import Link from "next/link";
import axios from "axios";
import ResourceLabel from "components/ResourceLabel";
import moment from "moment";


const ResourceDetail = ({resource}) =>{

    const activeResource =()=>{
         axios.patch("/api/resources",{...resource, status: "active"})
         .then(_=> location.reload())
         .catch(_=> alert("cannot!!"))
    }


    return(
        <Layout>
            <section className="hero ">
                <div className="hero-body">
                    <div className="container">
                        <section className="section">
                            <div className="columns">
                                <div className="column is-8 is-offset-2">
                                    <div className="content is-medium">
                                        <h2 className="subtitle is-4">
                                            {moment(resource.createdAt).format("LLL")}
                                            <ResourceLabel status={resource.status} />
                                        </h2>
                                        <h1 className="title">{resource.title}</h1>
                                        <p>{resource.description}</p>
                                        <p>Time to finish: {resource.timeToFinish} min</p>
                                        { resource.status === "inactive" &&
                                            <>
                                                <Link href={"/resources/" + resource.id +"/edit"} legacyBehavior>
                                                    <a className="button is-warning">
                                                        Update
                                                    </a>
                                                </Link>
                                                <button 
                                                    onClick={activeResource}
                                                    className="button is-success ml-1">
                                                    Active
                                                </button>
                                            </>
                                        }
                                    </div>
                                </div>
                            </div>
                        </section>   
                    </div>
                </div>
            </section>
        </Layout>
    )
}
    

//ResourceDetail.getInitialProps = async({query}) =>{
//   
//  const dataRes = await fetch("http://localhost:3001/api/resources/${query.id}");
//  const data = await dataRes.json();

//  console.log(data);

//  return{
//          resource: data
//  }
//}


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




//xport async function getStaticProps({params}){

//  const dataRes = await fetch("http://localhost:3001/api/resources/"+params.id);
//  const data = await dataRes.json();

//  console.log(data);

//  return{
//      props:{
//          resource: data
//      },
//      revalidate: 1
//  }
//




export default ResourceDetail;