export interface Network {
    name: string
    rpc: string
}

export interface NetworkList {
    ETHEREUM: Network
    ARBITRUM: Network
    OPTIMISM: Network
    POLYGON: Network
    BSC: Network
}

export const networks: NetworkList = {
    ETHEREUM: { 
        name: "Ethereum", 
        rpc: "https://rpc.ankr.com/eth/3ec8a99c8d8a9f1d4b41cbbd6849bd882e7af57f597634fd1f39c6cb5986656f",
    },
    ARBITRUM: { 
        name: "Arbitrum", 
        rpc: "https://rpc.ankr.com/arbitrum/3ec8a99c8d8a9f1d4b41cbbd6849bd882e7af57f597634fd1f39c6cb5986656f",
    },
    OPTIMISM: { 
        name: "Optimism", 
        rpc: "https://rpc.ankr.com/optimism/3ec8a99c8d8a9f1d4b41cbbd6849bd882e7af57f597634fd1f39c6cb5986656f",
    },
    POLYGON: { 
        name: "Polygon",
        rpc: "https://rpc.ankr.com/polygon/3ec8a99c8d8a9f1d4b41cbbd6849bd882e7af57f597634fd1f39c6cb5986656f",
    },
    BSC: {
        name: "Binance Smart Chain",
        rpc: "https://rpc.ankr.com/bsc/3ec8a99c8d8a9f1d4b41cbbd6849bd882e7af57f597634fd1f39c6cb5986656f",
    }
}