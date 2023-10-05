import Layout from "components/Layout";
import ResourceHighlight from "components/ResourceHighlight";
import Newsletter from "components/Newsletter";
import ResourceList from "components/ResourceList";
import Footer from "components/Footer";


//import data from "pages/api/data.json";


function Home({resources}){

  return(
    <Layout>
      <ResourceHighlight 
      resources={resources}
      />
      <Newsletter />
      <ResourceList 
      resources={resources}
      />
      <Footer />
    </Layout>
    )
} 


//is called every time you will visit the page
//function is executed on the server
export async function getServerSideProps(){
  // 環境変数をインポート
  let url = process.env.API_URL + "/resources";

  const resData = await fetch(url);
  const data = await resData.json();

  console.log(data);

  return{
    props:{
      resources:data
    }
  }
}



//is called at the build time, and it's called only once
//export async function getStaticProps(){
// const resData = await fetch("http://localhost:3000/api/resources");
// const data = await resData.json();

// return{
//   props:{
//     resources:data

//   }
// }
//


export default Home;