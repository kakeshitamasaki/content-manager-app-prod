
import Link from "next/link"
import { useEffect, useState } from "react";
import axios from "axios";
import moment from "moment";

const ActiveResource = ()=>{
    const [resource, setResource] = useState({});
    const [seconds, setSeconds] = useState();

    
        
        useEffect(() =>{
            async function fetchResource(){
                const axiosRes = await axios.get("/api/activeresource");
                const resource = axiosRes.data;
                const timeToFinish = parseInt(resource.timeToFinish,10);
                const elapesdTime = moment().diff(moment(resource.activationTime), "seconds");
                const updatedTimeToFinish = (timeToFinish * 60)-elapesdTime;
                
                if (updatedTimeToFinish >= 0){
                    resource.timeToFinish = updatedTimeToFinish;
                    setSeconds(updatedTimeToFinish);
                }

                setResource(resource);
            }

            fetchResource();
        },[])
    
        useEffect(()=>{
            const interval = setInterval(() =>{
                setSeconds(seconds -1 );
            }, 1000);

            if (seconds < 0){
                clearInterval(interval);
            }

            return ()=>clearInterval(interval)
        },[seconds])

    const completeResource =()=>{
        axios.patch("/api/resources",{...resource, status: "complete"})
        .then(_=> location.reload())
        .catch(_=> alert("Cannot complete the resource!"))
    }

    const hasResource = resource && resource.id;
    return (

        <div className="active-resource">
            <h1 className="resource-name">
                {hasResource ? resource.title : "No Resource Active"}
            </h1>
                <div className="time-wrapper">
                    { hasResource &&
                    ( seconds >0 ?
                        <h2 className="elapesed-time">
                            {seconds}
                        </h2> :
                        <h2 className="elapesed-time">
                            <button
                                onClick={completeResource} 
                                className="button is-success">
                                click and Done!
                            </button>
                        </h2>
                    )
                    }
                </div>
                {
                    hasResource ?
                    <Link href={"/resources/" + resource.id} legacyBehavior>
                        <a className="button">
                            Go to resource
                        </a>
                    </Link> :
                    <Link href="/" legacyBehavior>
                        <a className="button">
                            Go to resources
                        </a>
                    </Link>
                }
 
        </div>


    )

}

export default ActiveResource;