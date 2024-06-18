import { useState } from "react";
import axios from "axios";
type TStatus = "idle" | "checking" | "available" | "notAvailable" | "failed";
const useCheckEmailAvailabilty = ()=> {
    const [emailAvailabiltyStatus,setemailAvailabiltyStatus] =useState<TStatus>("idle");
    const [enteredemail,setenterdemail] = useState<null | string>(null)
    const  checkEmailavailabilty = async (email : string)=>{
        setemailAvailabiltyStatus("checking")
        setenterdemail(email)
        try{
            const response = await axios.get(`http://localhost:5005/users?email=${email}`)
            if(!response.data.length){
                setemailAvailabiltyStatus("available")

            }
            else{
                setemailAvailabiltyStatus("notAvailable")

            }

        }
        catch(error){
            setemailAvailabiltyStatus("failed")

        }

    }
    const resetcheckemailavailabilty = () => {
        setemailAvailabiltyStatus("idle")
        setenterdemail(null)
    }

   return{checkEmailavailabilty,emailAvailabiltyStatus, enteredemail,resetcheckemailavailabilty}
}
export default useCheckEmailAvailabilty;
