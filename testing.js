(async() => {
const { Octokit } = require("@octokit/core");
const octokit = new Octokit({ auth: `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` });

await octokit.request("GET /repos/ahqsoftwares/test-electron-project/releases/latest", {
    owner: "ahqsoftwares",
    type: "private",
    repo: "test-electron-project"
  }).then((json) => {
    let zip;
    for (i = 0; i < json[`data`]['assets'].length; i++) {
        //console.log(json[`data`][`assets`]);
        if (json[`data`]['assets'][i]['name'] === `electron-project-${String("v1.0.6").replace("v", "")}-win.zip`) zip = json[`data`]['assets'][i][`browser_download_url`];
    }
    console.log(`update uri fetched`);
    console.log(zip);
});
})()