import type { AWS } from "@serverless/typescript";

import { getPersons, addPerson,addPersonViaGoogleSheet } from "@functions/Persons";
import {
  getOrganizationByID,
  getOrganizations,
  addOrganization,
  deleteOrganizationByID,
  deleteOrganizations,
} from "@functions/Organizations";
import {
  addDeal,
  deleteDeals,
  updateDeal,
  getDealByID,
  getDeals,
  deleteDealByID,
} from "@functions/Deals";

const serverlessConfiguration: AWS = {
  service: "pdits",
  frameworkVersion: "3",
  plugins: ["serverless-esbuild", "serverless-offline"],
  provider: {
    name: "aws",
    runtime: "nodejs14.x",
    apiGateway: {
      minimumCompressionSize: 1024,
      shouldStartNameWithService: true,
    },
    environment: {
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: "1",
      NODE_OPTIONS: "--enable-source-maps --stack-trace-limit=1000",
    },
  },
  // import the function via paths
  functions: {
    getPersons,
    addPerson,
    addPersonViaGoogleSheet,
    getOrganizationByID,
    getOrganizations,
    addOrganization,
    deleteOrganizationByID,
    deleteOrganizations,
    addDeal,
    deleteDeals,
    updateDeal,
    getDealByID,
    getDeals,
    deleteDealByID,
  },
  package: { individually: true },
  custom: {
    esbuild: {
      bundle: true,
      minify: false,
      sourcemap: true,
      exclude: ["aws-sdk"],
      target: "node14",
      define: { "require.resolve": undefined },
      platform: "node",
      concurrency: 10,
    },
  },
};

module.exports = serverlessConfiguration;
