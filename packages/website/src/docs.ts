import * as fs from "fs-extra";

async function main() {
  await copyGettingStarted();
  await copyCachingDocs();
  await copyStorageAdapters();
  await copyCompressionDocs();
};

async function copyGettingStarted() {
    const originalFileText = await fs.readFile("../../docs/getting-started/index.md", "utf8");
    let newFileText = "---\n";
    newFileText += `title: 'Getting Started Guide'\n`;
    newFileText += `permalink: /docs/\n`;
    newFileText += `order: 0\n`;
    newFileText += "---\n";
    newFileText += "\n";
    newFileText += originalFileText;

    await fs.writeFile("site/docs/index.md", newFileText);
}

//rename Caching to How To Use Keyv
async function copyCachingDocs() {
    await fs.copy("../../docs/caching/", "site/docs/caching");
}

async function copyStorageAdapters() {
    const storageAdapters = await fs.readdir("../../packages");
    const filterList = ["keyv", "website", "compress-brotli", "compress-gzip"];

    for (const storageAdapter of storageAdapters) {
        if((filterList.indexOf(storageAdapter) > -1) !== true ) {
            console.log("Adding storage adapter: " + storageAdapter);
            await createDoc(storageAdapter, "../../packages", "site/docs/storage-adapter", "Storage Adapter");
        }
    };
}
async function copyCompressionDocs() {
    const compressionAdapters = await fs.readdir("../../packages");
    for(const compressionAdapter of compressionAdapters) {
        if(compressionAdapter.startsWith("compress-")) {
            console.log("Adding compression adapter: " + compressionAdapter);
            await createDoc(compressionAdapter, "../../packages", "site/docs/compression", "Compression");
        }
    }
}

async function createDoc(adapterName: string, path: string, outputPath: string, parent:string) {
    const originalFileName = "readme.md";
    const newFileName = `${adapterName}.md`;
    const packageJSONPath = `${path}/${adapterName}/package.json`;
    const packageJSON = await fs.readJSON(packageJSONPath);
    const originalFileText = await fs.readFile(`${path}/${adapterName}/${originalFileName}`, "utf8");
    let newFileText = "---\n";
    newFileText += `title: '${packageJSON.name}'\n`;
    newFileText += `sidebarTitle: '${packageJSON.name}'\n`;
    newFileText += `parent: '${parent}'\n`;
    newFileText += "---\n";
    newFileText += "\n";
    newFileText += originalFileText;
    await fs.writeFile(`${outputPath}/${newFileName}`, newFileText);
}

// add in the main Keyv module

// third-party storage adapters

main();