import { Octokit, App } from "octokit";

const AUTHCODE = "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";

const octokit = new Octokit({ auth: AUTHCODE });

const submitReport = (issue, description) => {
  octokit.request("POST /repos/DoiBoi/nwPlus-Project/issues", {
    owner: "issueBot",
    repo: "nwPlus-Project",
    title: issue,
    body: description,
    assignees: [],
    labels: ["bug"],
    headers: {},
  });
};

export default submitReport;
