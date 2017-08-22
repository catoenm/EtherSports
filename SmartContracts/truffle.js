module.exports = {
  networks: {
    development: {
      host: "localhost",
      port: 8545,
      from: "0x6f777acf24d9130f6d767f822ded341c594c96ba",
      network_id: "*" // Match any network id
    },
    testrpc: {
      host: "localhost",
      port: 8545,
      network_id: "*" // Match any network id
    }
  }
};
