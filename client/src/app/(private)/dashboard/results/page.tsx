'use client'
import ContractAnalysisResults from "@/components/analysis/contract-analysis-results";
import EmptyState from "@/components/analysis/empty-state";
import { useSubscription } from "@/hooks/use-subscription";
import { api } from "@/lib/api";
import stripePromise from "@/lib/stripe";
import { useContractStore } from "@/store/zustand"
import { toast } from "sonner";

export default function ContractResultsPage(){

    const analysisrResults = useContractStore((state) => state.analysisrResults);

    const handleUpgrade = async () => {

        setLoading(true);
        if(!isActive){
            try {
    
                const response = await api.get('/payment/create-checkout-session');
          
                const stripe = await stripePromise;
                
                await stripe?.redirectToCheckout({
                  sessionId: response.data.sessionId,
                })
                
              } catch (error) {
                toast.error("Please try again or login to your account")
                console.log(error);
              }finally{
                setLoading(false);
              }
        } else{
            toast.error("You are already a premium user")
        }
      }

    const {
        subscriptionStatus,
        setLoading,
    }  = useSubscription();

    if (!subscriptionStatus) {
        return <div>Loading...</div>;
    }
    if (!analysisrResults) {
      return <EmptyState title="No Analysis" description="Please try again"/>
    }

    const isActive = subscriptionStatus.status === "active";

    return(

        <ContractAnalysisResults
            contractId={analysisrResults._id}
            isActive={isActive}
            analysisResults={analysisrResults}
            onUpgrade={handleUpgrade}
        />
    )
}