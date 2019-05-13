import React from "react";
import { APIClient, Openlaw } from "openlaw";
import { Container, Loader, Button } from "semantic-ui-react";
import "openlaw-elements/dist/openlaw-elements.min.css";
import OpenLawForm from "openlaw-elements";
import AgreementPreview from "./AgreementPreview";
require("dotenv").config();

const COMPANY = "Company";
const COMPANY_ENTITY_STATUS = "Company Entity Status";
const COMPANY_ENTITY_TYPE = "Company Entity Type";
const COMPANY_JURISDICTION = "Company Jurisdiction";
const COMPANY_SIGNATORY = "Company Signatory";
const COMPANY_SIGNATORY_TITLE = "Company Signatory Title";
const COMPANY_SIGNATORY_EMAIL = "Company Signatory Email";
const COMPANY_VALUATION = "Company Valuation";
const OFFERING_AMOUNT = "Investment Amount";
const OTHER_AMOUNT = "Other Investment Amount"
const SERIES_AA_CURRENCY = "Series A Currency";
const NUMBER_OF_SHARES = "Number of Shares";
const PRICE_PER_SHARE = "Price per share";
const POSTMONEY_VALUATION = "Post_money valuation";
const AVAILABLE_OPTION_POOL_PERCENTAGE = "Available Option Pool Percentage";
const COMMON_MAJORITY_DEF = "CommonMajorityDef";
const BOARD_SELECTION_RIGHTS = "Board Selection Rights";
const FOUNDER_VESTING_SCHEDULE = "Founder Vesting Schedule";
const EFFECTIVE_DATE = "Effective Date";
const INVESTOR = "Lead Investor";
const INVESTOR_SIGNATORY = "Lead Investor Signatory";
const INVESTOR_SIGNATORY_TITLE = "Lead Investor Signatory Title";
const INVESTOR_SIGNATORY_EMAIL = "Lead Investor Signatory Email";

const openLawConfig = {
  server: "https://app.openlaw.io",
  templateName: "Y-COMBINATOR SERIES A TERM SHEET",
  userName: "gubif@mailing.one",
  password: "type12enter"
};

console.log(openLawConfig.templateName);
const apiClient = new APIClient(openLawConfig.server);

class SeriesA extends React.Component {
  //initial state of variables for Assignment Template, and web3,etc
  state = {
    // State variables for agreement

    compName: null,
    compStatus: null,
    compType: "Limited Liability Company",
    compJuris: "Delaware",
    compSign: null,
    compSignT: null,
    compEmail: null,
    compVal: null,
    offAmnt: null,
    othAmnt: null,
    serCurr: null,
    numShares: null,
    prcShares: null,
    postVal: null,
    optionPool: null,
    majDef: null,
    brdRights: null,
    founderSch: null,
    effDate: null,
    investName: null,
    investSign: null,
    investTitle: null,
    investEmail: null,

    // State variables for OpenLaw
    title: "",
    template: "",
    creatorId: "",
    compiledTemplate: null,
    parameters: {},
    executionResult: null,
    variables: null,
    draftId: "",

    // State variables for preview component
    previewHTML: null
  };

  componentDidMount = async () => {

    console.log(openLawConfig.userName)
    //const { web3, accounts, contract } = this.props;
    //create an instance of the API client with url as parameter
    apiClient
      .login(openLawConfig.userName, openLawConfig.password)
      .then(console.log);

    //Retrieve your OpenLaw template by name, use async/await
    const template = await apiClient.getTemplate(openLawConfig.templateName);
    console.log(template);

    //pull properties off of JSON and make into variables
    const title = template.title;

    //Retreive the OpenLaw Template, including MarkDown
    const content = template.content;
    console.log("template..", template);

    //Get the most recent version of the OpenLaw API Tutorial Template
    const versions = await apiClient.getTemplateVersions(
      openLawConfig.templateName,
      20,
      1
    );
    console.log("versions..", versions[0], versions.length);

    //Get the creatorID from the template.
    const creatorId = versions[0].creatorId;
    console.log("creatorId..", creatorId);

    //Get my compiled Template, for use in rendering the HTML in previewTemplate
    const compiledTemplate = await Openlaw.compileTemplate(content);
    if (compiledTemplate.isError) {
      throw "template error" + compiledTemplate.errorMessage;
    }
    console.log("my compiled template..", compiledTemplate);

    const parameters = {};
    const { executionResult, errorMessage } = await Openlaw.execute(
      compiledTemplate.compiledTemplate,
      {},
      parameters
    );

    console.log("execution result:", executionResult);

    // ** This is helpful for logging in development, or throwing exceptions at runtime.
    if (errorMessage) {
      console.error("Openlaw Execution Error:", errorMessage);
    }

    const variables = await Openlaw.getExecutedVariables(executionResult, {});
    console.log("variables:", variables);

    this.setState({
      title,
      template,
      creatorId,
      compiledTemplate,
      parameters,
      executionResult,
      variables
    });
  };

  onChange = (key, value) => {
    switch (key) {
      case COMPANY:
        this.setState({ compName: value });
        break;
      case COMPANY_ENTITY_STATUS:
        this.setState({ compStatus: value });
        break;
      case COMPANY_ENTITY_TYPE:
        this.setState({ compType: value });
        break;
      case COMPANY_JURISDICTION:
        this.setState({ compJuris: value });
        break;
      case COMPANY_SIGNATORY:
        this.setState({ compSign: value });
        break;
      case COMPANY_SIGNATORY_TITLE:
        this.setState({ compSignT: value });
        break;
      case COMPANY_SIGNATORY_EMAIL:
        this.setState({ compEmail: value });
        break;
      case COMPANY_VALUATION:
        this.setState({ compVal: value });
        break;
      case OFFERING_AMOUNT:
        this.setState({ offAmnt: value });
        break;
      case OTHER_AMOUNT:
        this.setState({ othAmnt: value });
        break;
      case SERIES_AA_CURRENCY:
        this.setState({ serCurr: value });
        break;
      case NUMBER_OF_SHARES:
        this.setState({ numShares: value });
        break;
      case PRICE_PER_SHARE:
        this.setState({ prcShares: value });
        break;
      case POSTMONEY_VALUATION:
        this.setState({ postVal: value });
        break;
      case AVAILABLE_OPTION_POOL_PERCENTAGE:
        this.setState({ optionPool: value });
        break;
      case COMMON_MAJORITY_DEF:
        this.setState({ majDef: value });
        break;
      case BOARD_SELECTION_RIGHTS:
        this.setState({ brdRights: value });
        break;
      case FOUNDER_VESTING_SCHEDULE:
        this.setState({ founderSch: value });
        break;
      case EFFECTIVE_DATE:
        this.setState({ effDate: value });
        break;
      case INVESTOR:
        this.setState({ investName: value });
        break;
      case INVESTOR_SIGNATORY:
        this.setState({ investSign: value });
        break;
      case INVESTOR_SIGNATORY_TITLE:
        this.setState({ investTitle: value });
        break;
      case INVESTOR_SIGNATORY_EMAIL:
        this.setState({ investEmail: value });
        break;
    }
    console.log("KEY:", key, "VALUE:", value);
  };
  setTemplatePreview = async () => {
    const {
      compName,
      compStatus,
      compType,
      compJuris,
      compSign,
      compSignT,
      compEmail,
      compVal,
      offAmnt,
      othAmnt,
      serCurr,
      numShares,
      prcShares,
      postVal,
      optionPool,
      majDef,
      brdRights,
      founderSch,
      effDate,
      investName,
      investSign,
      investTitle,
      investEmail,
      compiledTemplate
    } = this.state;
    try {
      const params = {
        [COMPANY]: compName,
        [COMPANY_ENTITY_STATUS]: compStatus,
        [COMPANY_ENTITY_TYPE]: compType,
        [COMPANY_JURISDICTION]: compJuris,
        [COMPANY_SIGNATORY]: compSign,
        [COMPANY_SIGNATORY_TITLE]: compSignT,
        [COMPANY_SIGNATORY_EMAIL]: compEmail,
        [COMPANY_VALUATION]: compVal,
        [OFFERING_AMOUNT]: offAmnt,
        [OTHER_AMOUNT]: othAmnt,
        [SERIES_AA_CURRENCY]: serCurr,
        [NUMBER_OF_SHARES]: numShares,
        [PRICE_PER_SHARE]: prcShares,
        [POSTMONEY_VALUATION]: postVal,
        [AVAILABLE_OPTION_POOL_PERCENTAGE]: optionPool,
        [COMMON_MAJORITY_DEF]: majDef,
        [BOARD_SELECTION_RIGHTS]: brdRights,
        [FOUNDER_VESTING_SCHEDULE]: founderSch,
        [EFFECTIVE_DATE]: effDate,
        [INVESTOR]: investName,
        [INVESTOR_SIGNATORY]: investSign,
        [INVESTOR_SIGNATORY_TITLE]: investTitle,
        [INVESTOR_SIGNATORY_EMAIL]: investEmail
      };
      console.log(params);

      const executionResult = await Openlaw.execute(
        compiledTemplate.compiledTemplate,
        {},
        params
      );
      const agreements = await Openlaw.getAgreements(
        executionResult.executionResult
      );
      const previewHTML = await Openlaw.renderForReview(
        agreements[0].agreement,
        {}
      );

      this.setState({ previewHTML });
    } catch (error) {
      throw error;
    }
  };

  render() {
    const { variables, parameters, executionResult, previewHTML } = this.state;
    if (!executionResult) return <Loader active />;
    return (
      <Container text style={{ marginTop: "7em" }}>
        <h1>SERIES A TERM SHEET</h1>
        <OpenLawForm
          apiClient={apiClient}
          executionResult={executionResult}
          parameters={parameters}
          onChangeFunction={this.onChange}
          openLaw={Openlaw}
          variables={variables}
        />
        <Button onClick={this.setTemplatePreview}>Preview</Button>
        <AgreementPreview previewHTML={previewHTML} />
      </Container>
    );
  }
}

export default SeriesA;