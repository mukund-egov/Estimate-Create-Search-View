import React, { Fragment, useState, useEffect } from "react";
import { ViewComposer, Header, Loader } from "@egovernments/digit-ui-react-components";
import { useTranslation } from "react-i18next";
import { useLocation } from "react-router-dom";
import { useIndividualView } from "../hooks/useIndividualView";

function ViewEstimate() {
  const { t } = useTranslation();
  const location = useLocation();
  const tenantId = Digit.ULBService.getCurrentTenantId();
  const searchParams = new URLSearchParams(location.search);
  const [estimateId, setEstimateId] = useState(null); // Define individualId state

  useEffect(() => {
    const id = searchParams.get("id");
    console.log("id", id);
    setEstimateId(id); // Set estimateId state with the value from URL
  }, [searchParams]);

  const { isLoading, data: testData, revalidate, isFetching } = useIndividualView({
    t,
    tenantId: tenantId,
    estimateId: searchParams.get("id"), // Use estimateId here
    config: {
      select: (data) => ({
        cards: [
          {
            sections: [
              {
                type: "DATA",
                values: data?.details,
              },
            ],
          },
        ],
      }),
    },
  });
  console.log("testData", testData);

  // if (isLoading) {
  //   return <Loader />;
  // }

  return (
    <>
      <Header>{t("Estimate details")}</Header>
      {!isLoading && estimateId && <ViewComposer data={testData} isLoading={isLoading} />}
    </>
  );
}

export default ViewEstimate;
