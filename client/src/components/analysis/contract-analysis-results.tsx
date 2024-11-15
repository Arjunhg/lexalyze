import { ContractAnalysis } from "@/interfaces/contract.interfaces";
import { ReactNode, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { AlertCircle, ArrowDown, ArrowRight, ArrowUp, Calendar, Check, ChevronDown, Clock, Crown, Download, Feather, File, FileText, Gavel, Lightbulb, Lock, Minus, Scale, Shield, Sparkles } from "lucide-react";
import OverallScoreChart from "./chart";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@radix-ui/react-tabs";
import { motion } from "framer-motion";
import { Button } from "../ui/button";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@radix-ui/react-accordion";

interface IContractAnalysisResultsProps {
    analysisResults: ContractAnalysis;
    isActive: boolean;
    contractId: string;
    onUpgrade: () => void;
}
export default function ContractAnalysisResults({analysisResults, isActive, onUpgrade} : IContractAnalysisResultsProps){

    const [activeTab, setActiveTab] = useState("summary");

    if(!analysisResults){
        return <div>No Results</div>
    }
    
    const getScore = () => {
        const score = analysisResults.overallScore;;
        if(score>70)
            return {icon: ArrowUp, color: "text-green-500", text: "Good"};
        if(score < 50)
            return {icon: ArrowDown, color: "text-red-500", text: "Bad"};
        return {icon: Minus, color: "text-yellow-500", text: "Average"};
    }

    const scoreTrend = getScore();

    const getSeverityColor = (severity: string) => {
        switch (severity.toLowerCase()) {
            case "high":
                return "bg-red-100 text-red-800 border border-red-200";
            case "medium":
                return "bg-yellow-100 text-yellow-800 border border-yellow-200";
            case "low":
                return "bg-green-100 text-green-800 border border-green-200";
            default:
                return "bg-gray-100 text-gray-800 border border-gray-200";
        }
    };

    const getImpactColor = (impact: string) => {
        switch (impact.toLowerCase()) {
            case "high":
                return "bg-purple-100 text-purple-800 border border-purple-200";
            case "medium":
                return "bg-blue-100 text-blue-800 border border-blue-200";
            case "low":
                return "bg-teal-100 text-teal-800 border border-teal-200";
            default:
                return "bg-gray-100 text-gray-800 border border-gray-200";
        }
    };
    

    const renderRisksAndOpportunities = (
        items: Array<{
            risk?: string;
            opportunity?: string;
            explanation?: string;
            severity?: string;
            impact?: string
        }>,
        type: "risk" | "opportunity"
    ) => {
        
        const displayItems = isActive ? items : items.slice(0, 3);
        const fakeItems = {
            risk: type === "risk" ? "Hidden Risk" : undefined,
            opportunity: type === "opportunity" ? "Hidden Opportunity" : undefined,
            explanation: "Hidden Explanation",
            severity: "low",
            impact: "low",
          };

          return(
            <ul className="space-y-4">
                {displayItems.map((item, index) => (
                <motion.li
                    className="border rounded-lg p-6 hover:shadow-xl transition-all duration-300 border-l-4 bg-gradient-to-br from-white to-gray-50 group relative overflow-hidden"
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                    <div className="flex justify-between items-start mb-2">
                        <span className="font-semibold text-xl bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent group-hover:from-blue-600 group-hover:to-purple-600 transition-all duration-300">
                            {type === "risk" ? item.risk : item.opportunity}
                        </span>
                        {(item.severity || item.impact) && (
                            <div className={`
                                px-3 py-1 rounded-full text-xs font-semibold 
                                ${type === "risk" 
                                    ? getSeverityColor(item.severity || 'low')
                                    : getImpactColor(item.impact || 'low')
                                    
                                }transition-all duration-300 group-hover:scale-105 shadow-sm`
                            }>
                                {type === "risk" 
                                    ? (item.severity || 'LOW').toUpperCase()
                                    : (item.impact || 'LOW').toUpperCase()
                                }
                            </div>
                        )}
                    </div>
                    <p className="mt-3 text-gray-600 leading-relaxed group-hover:text-gray-700 transition-colors duration-300">
                    {type === "risk" ? item.explanation : item.explanation}
                    </p>
                </motion.li> 
                ))}
               {!isActive && items.length > 3 && (
                    <motion.li
                        className="border rounded-lg p-6 blur-sm bg-gradient-to-br from-white to-gray-50 hover:shadow-xl transition-all duration-300"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: displayItems.length * 0.1 }}
                    >
                        <div className="flex justify-between items-start mb-2">
                            <span className="font-semibold text-xl bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent group-hover:from-blue-600 group-hover:to-purple-600 transition-all duration-300">
                                {type === "risk" ? fakeItems.risk : fakeItems.opportunity}
                            </span>
                            <div className="px-3 py-1 rounded-full text-xs font-semibold bg-gray-100 text-gray-800 border border-gray-200">
                                {type === "risk" ? "LOW" : "LOW"}
                            </div>
                        </div>
                    </motion.li>
                )}
            </ul>
          )
          
    }

    const renderPremiumAccordition = (content: ReactNode) => {
        if (isActive) {
          return content;
        }

        return (
            <div className="relative">
              <div className="absolute inset-0 bg-white/50 backdrop-blur-sm z-50 flex items-center justify-center">
                <Button variant={"outline"} onClick={onUpgrade}>
                  Upgrade to Premium
                </Button>
              </div>
              <div className="opacity-50">{content}</div>
            </div>
          );
    }

    return(

        <div className="container max-w-7xl mx-auto px-6 py-12">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold">Analysis Results</h1>
                <div className="flex space-x-2">{/* ASK AI BUTTON */}</div>
            </div>

            <Card className="mb-6 shadow-lg hover:shadow-xl transition-shadow duration-300 bg-gradient-to-b from-white to-gray-50">
                <CardHeader>
                    <CardTitle>Overal Contract Score</CardTitle>
                    <CardDescription>
                        Based on risks and opportunities identified
                    </CardDescription>
                </CardHeader>

                <CardContent>
                    <div className="flex items-center justify-between">
                        <div className="w-1/2">
                            <div className="flex items-center space-x-4 mb-4">
                                <div className="text-5xl bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent font-bold">
                                    {analysisResults.overallScore ?? 0}
                                </div>
                                <div className={`flex items-center ${scoreTrend.color}`}>
                                    <scoreTrend.icon className="size-8 mr-1 animate-bounce" />
                                    <span className="font-semibold">{scoreTrend.text}</span>
                                </div>
                            </div>
                            <div className="space-y-2 bg-gray-50 p-4 rounded-xl">
                                <div className="flex justify-between text-sm">
                                    <span>Risk</span>
                                    <span>{100 - analysisResults.overallScore}%</span>
                                    {/* <span>35%</span> */}
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span>Opportunities</span>
                                    <span>{analysisResults.overallScore}%</span>
                                    {/* <span>34%</span> */}
                                </div>
                            </div>
                            <p className="text-sm text-gray-600 mt-4">
                                This score represents the overall risk and opportunitys
                                identified in the contract.
                            </p>
                        </div>

                        <div className="w-1/2 h-48 flex justify-center items-center p-4 rounded-xl bg-gradient-to-br from-blue-50 to-purple-50">
                            <div className="w-full h-full max-w-xs">
                                <OverallScoreChart
                                // overallScore={analysisResults.overallScore}
                                overallScore={70}
                                />
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>

            <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-6">
                <TabsList className="grid w-full grid-cols-4 bg-gray-100 p-1 rounded-xl mb-6">
                    <TabsTrigger value="summary" className="px-6 py-3 rounded-lg transition-all duration-200 font-medium data-[state=active]:bg-white data-[state=active]:shadow-md data-[state=active]:text-blue-600">Summary</TabsTrigger>
                    <TabsTrigger value="risks" className="px-6 py-3 rounded-lg transition-all duration-200 font-medium data-[state=active]:bg-white data-[state=active]:shadow-md data-[state=active]:text-blue-600">Risks</TabsTrigger>
                    <TabsTrigger value="opportunities" className="px-6 py-3 rounded-lg transition-all duration-200 font-medium data-[state=active]:bg-white data-[state=active]:shadow-md data-[state=active]:text-blue-600">Opportunities</TabsTrigger>
                    <TabsTrigger value="details" className="px-6 py-3 rounded-lg transition-all duration-200 font-medium data-[state=active]:bg-white data-[state=active]:shadow-md data-[state=active]:text-blue-600">Details</TabsTrigger>
                </TabsList>

               <TabsContent value="summary">
                    <Card className="bg-gradient-to-br from-white to-gray-50 shadow-lg hover:shadow-xl transition-all duration-300">
                        <CardHeader className="border-b border-gray-100 pb-6">
                            <CardTitle className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent flex items-center gap-3">
                                <FileText className="h-6 w-6" />
                                Contract Summary
                            </CardTitle>
                            <p className="text-gray-500 mt-2">Key points and overview of the contract</p>
                        </CardHeader>
                        <CardContent className="pt-6">
                            <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl p-6">
                                <div className="flex gap-4 mb-6">
                                    <div className="flex items-center gap-2 text-sm">
                                        <Calendar className="h-4 w-4 text-blue-600" />
                                        <span className="text-gray-600">Analysis Date: {new Date().toLocaleDateString()}</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-sm">
                                        <Clock className="h-4 w-4 text-purple-600" />
                                        <span className="text-gray-600">Last Updated: {new Date().toLocaleTimeString()}</span>
                                    </div>
                                </div>
                                
                                <div className="space-y-4">
                                    <motion.p 
                                        className="text-lg leading-relaxed text-gray-700"
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.5 }}
                                    >
                                        {analysisResults.summary}
                                    </motion.p>
                                    
                                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
                                        <div className="p-4 bg-white rounded-lg shadow-sm">
                                            <FileText className="h-5 w-5 text-blue-600 mb-2" />
                                            <div className="text-sm font-medium text-gray-600">Total Pages</div>
                                            <div className="text-2xl font-bold text-gray-800">12</div>
                                        </div>
                                        <div className="p-4 bg-white rounded-lg shadow-sm">
                                            <AlertCircle className="h-5 w-5 text-yellow-600 mb-2" />
                                            <div className="text-sm font-medium text-gray-600">Key Points</div>
                                            <div className="text-2xl font-bold text-gray-800">{analysisResults.recommendations.length}</div>
                                        </div>
                                        <div className="p-4 bg-white rounded-lg shadow-sm">
                                            <Shield className="h-5 w-5 text-green-600 mb-2" />
                                            <div className="text-sm font-medium text-gray-600">Compliance</div>
                                            <div className="text-2xl font-bold text-gray-800">{analysisResults.overallScore}%</div>
                                        </div>
                                        <div className="p-4 bg-white rounded-lg shadow-sm">
                                            <Clock className="h-5 w-5 text-purple-600 mb-2" />
                                            <div className="text-sm font-medium text-gray-600">Duration</div>
                                            <div className="text-2xl font-bold text-gray-800">2 Years</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            
                            <div className="mt-6 flex justify-end">
                                <Button 
                                    variant="outline" 
                                    className="flex items-center gap-2 hover:bg-gray-50 transition-colors"
                                >
                                    <Download className="h-4 w-4" />
                                    Export Summary
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="risks">
                    <Card>
                        <CardHeader>
                            <CardTitle>Risks</CardTitle>
                        </CardHeader>
                        <CardContent>
                            {renderRisksAndOpportunities(
                                analysisResults.risks,
                                "risk")}
                            {!isActive && (
                                <p className="mt-6 text-center text-sm text-gray-500 bg-gradient-to-br from-blue-50 to-purple-50 p-4 rounded-xl shadow-sm">
                                Upgrade to Premium to see all risks
                                </p>
                            )}
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="opportunities">
                    <Card>
                        <CardHeader>
                        <CardTitle>Opportunities</CardTitle>
                        </CardHeader>
                        <CardContent>
                        {renderRisksAndOpportunities(
                            analysisResults.opportunities,
                            "opportunity"
                        )}
                        {!isActive && (
                            <p className="mt-4 text-center text-sm text-gray-500">
                            Upgrade to Premium to see all opportunities
                            </p>
                        )}
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="details">
                    {isActive ? (
                        <div className="grid md:grid-cols-2 gap-6">
                            <Card className="bg-gradient-to-br from-white to-gray-50 shadow-lg hover:shadow-xl transition-all duration-300">
                                <CardHeader className="border-b border-gray-100">
                                    <CardTitle className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent flex items-center gap-2">
                                        <FileText className="h-6 w-6" />
                                        Contract Details
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="pt-6">
                                    <ul className="space-y-4">
                                        {analysisResults.keyClauses?.map((keyClause, index) => (
                                            <motion.li 
                                                key={index}
                                                initial={{ opacity: 0, x: -20 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                transition={{ delay: index * 0.1 }}
                                                className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 border border-transparent hover:border-gray-200 transition-all duration-200"
                                            >
                                                <Check className="h-5 w-5 text-green-500 flex-shrink-0" />
                                                <span className="text-gray-700 leading-relaxed">
                                                    {keyClause}
                                                </span>
                                            </motion.li>
                                        ))}
                                    </ul>
                                </CardContent>
                            </Card>

                            <Card className="bg-gradient-to-br from-white to-gray-50 shadow-lg hover:shadow-xl transition-all duration-300">
                                <CardHeader className="border-b border-gray-100">
                                    <CardTitle className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent flex items-center gap-2">
                                        <Lightbulb className="h-6 w-6" />
                                        Recommendations
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="pt-6">
                                    <ul className="space-y-4">
                                        {analysisResults.recommendations?.map((recommendation, index) => (
                                            <motion.li 
                                                key={index}
                                                initial={{ opacity: 0, x: 20 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                transition={{ delay: index * 0.1 }}
                                                className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 border border-transparent hover:border-gray-200 transition-all duration-200"
                                            >
                                                <ArrowRight className="h-5 w-5 text-blue-500 flex-shrink-0" />
                                                <span className="text-gray-700 leading-relaxed">
                                                    {recommendation}
                                                </span>
                                            </motion.li>
                                        ))}
                                    </ul>
                                </CardContent>
                            </Card>
                        </div>
                    ) : (
                        <Card className="bg-gradient-to-br from-white to-gray-50 shadow-lg">
                            <CardHeader className="border-b border-gray-100">
                                <CardTitle className="text-2xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent flex items-center gap-2">
                                    <Lock className="h-6 w-6" />
                                    Premium Features
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="py-8">
                                <div className="text-center space-y-6">
                                    <div className="bg-gradient-to-br from-blue-50 to-purple-50 p-6 rounded-xl">
                                        <Crown className="h-12 w-12 text-yellow-500 mx-auto mb-4" />
                                        <p className="text-lg text-gray-700 mb-6">
                                            Upgrade to Premium to unlock detailed contract analysis,
                                            including key clauses and expert recommendations.
                                        </p>
                                        <Button
                                            // onClick={onUpgrade}
                                            className="bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:scale-105 transition-all duration-300 px-8 py-2.5 rounded-lg shadow-md hover:shadow-lg"
                                            onClick={onUpgrade}
                                        >
                                            <Sparkles className="h-5 w-5 mr-2" />
                                            Upgrade to Premium
                                        </Button>
                                    </div>
                                    <div className="grid grid-cols-2 gap-4 max-w-2xl mx-auto mt-6">
                                        <div className="flex items-center gap-2">
                                            <Check className="h-5 w-5 text-green-500" />
                                            <span className="text-gray-600">Detailed Analysis</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <Check className="h-5 w-5 text-green-500" />
                                            <span className="text-gray-600">Key Clauses</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <Check className="h-5 w-5 text-green-500" />
                                            <span className="text-gray-600">Expert Recommendations</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <Check className="h-5 w-5 text-green-500" />
                                            <span className="text-gray-600">Priority Support</span>
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    )}
                </TabsContent>

                
            </Tabs>

            <Accordion type="single" collapsible className="mb-6 space-y-4">
                {renderPremiumAccordition(
                    <>
                        <AccordionItem value="contract-details" className="border-none bg-gradient-to-r from-white to-gray-50 rounded-xl shadow-md hover:shadow-lg transition-all duration-300">
                            <AccordionTrigger className="px-6 py-4 w-full">
                                <div className="flex items-center justify-between w-full">
                                    <div className="flex items-center gap-3">
                                        <div className="p-2 rounded-lg bg-blue-100">
                                            <File className="h-5 w-5 text-blue-600" />
                                        </div>
                                        <span className="text-xl font-semibold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
                                            Contract Details
                                        </span>
                                    </div>
                                    <ChevronDown className="h-5 w-5 text-blue-600 transform transition-transform duration-300 ease-in-out group-data-[state=open]:rotate-180" />
                                </div>
                            </AccordionTrigger>
                            <AccordionContent className="px-6 pb-4">
                                <div className="grid md:grid-cols-2 gap-6 pt-4">
                                    <div className="space-y-4 p-4 rounded-xl bg-gradient-to-br from-blue-50 to-purple-50">
                                        <div className="space-y-2">
                                            <h3 className="text-lg font-semibold text-blue-800 flex items-center gap-2">
                                                <Clock className="h-5 w-5" />
                                                Duration and Termination
                                            </h3>
                                            <p className="text-gray-700 leading-relaxed">
                                                {analysisResults.contractDuration}
                                            </p>
                                            <div className="pt-3">
                                                <strong className="text-blue-700 block mb-2">
                                                    Termination Conditions
                                                </strong>
                                                <p className="text-gray-700 leading-relaxed">
                                                    {analysisResults.terminationConditions}
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="space-y-4 p-4 rounded-xl bg-gradient-to-br from-purple-50 to-blue-50">
                                        <div className="space-y-2">
                                            <h3 className="text-lg font-semibold text-purple-800 flex items-center gap-2">
                                                <Scale className="h-5 w-5" />
                                                Legal Information
                                            </h3>
                                            <div className="pt-1">
                                                <strong className="text-purple-700 block mb-2">
                                                    Legal Compliance
                                                </strong>
                                                <p className="text-gray-700 leading-relaxed">
                                                    {analysisResults.legalCompliance}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </AccordionContent>
                        </AccordionItem>
                    </>
                )}
            </Accordion>

            <Card className="bg-gradient-to-br from-white to-gray-50 shadow-lg hover:shadow-xl transition-all duration-300">
                <CardHeader className="border-b border-gray-100 pb-6">
                    <CardTitle className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent flex items-center gap-3">
                        <Gavel className="h-6 w-6" />
                        Negotiation Points
                    </CardTitle>
                    <p className="text-gray-500 mt-2">Key areas to focus on during negotiations</p>
                </CardHeader>
                <CardContent className="pt-6">
                    <div className="grid md:grid-cols-2 gap-4">
                        {analysisResults.negotiationPoints?.map((point, index) => (
                            <motion.div
                                key={index}
                                className="bg-gradient-to-br from-purple-50 to-blue-50 p-4 rounded-lg border border-transparent hover:border-gray-200 transition-all duration-200"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                            >
                                <div className="flex items-center gap-3">
                                    <Feather className="h-6 w-6 text-purple-600 flex-shrink-0" />
                                    <span className="text-gray-700 leading-relaxed">
                                        {point}
                                    </span>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </CardContent>
            </Card>

        </div>
    )

}