module.exports = {
  networks: {
    development: {
      host: "localhost",
      port: 8545,
      from: "0x005a4a4fa6fdde348984862fc287db5892d4b5a4",
      network_id: "*" // Match any network id
    },
    testrpc: {
      host: "localhost",
      port: 8545,
      network_id: "*" // Match any network id
    }
  }
};
