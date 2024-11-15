// "use client";

// import { use } from "react";
// import ContractResults from "./_components/contract-results";

// interface IContractResultsProps {
//   params: { id: string };
// }

// export default function ContractPage({
//   params: { id },
// }: IContractResultsProps) {
//   return <ContractResults contractId={id} />;
// }

// Above code give error: A param property was accessed directly with params.id. params is now a Promise and should be unwrapped with React.use() before accessing properties of the underlying params object. In this version of Next.js direct access to param properties is still supported to facilitate migration but in a future version you will be required to unwrap params with React.use().

// Solution: In the recent version of Next.js, accessing route parameters (params) directly without unwrapping is deprecated, as these parameters are now returned as Promises. To handle this, you should use the React.use function (or use) to unwrap the params before accessing the properties within them.

"use client";

import { use } from "react";
import ContractResults from "./_components/contract-results";

interface IContractResultsProps {
  params: Promise<{ id: string }>;
}

export default function ContractPage({
  params,
}: IContractResultsProps) {
  const { id } = use(params);

  return <ContractResults contractId={id} />;
}

