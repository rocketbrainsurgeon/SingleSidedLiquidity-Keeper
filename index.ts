import dotenv from "dotenv"
import { Network, networks } from "./networks"
import { createPublicClient, http, getContract, createWalletClient } from "viem"
import { arbitrum, bsc, Chain, mainnet, optimism, polygon } from "viem/chains"
import { privateKeyToAccount } from "viem/accounts"
import { SSL_ABI } from "./abi"

dotenv.config()

const printException = (e: any) => {
  if (e.error) console.log(`error: ${e.error}`)
  if (e.reason) console.log(`reason: ${e.reason}`)
  if (e.code) console.log(`code: ${e.code}`)
  if (e.body) console.log(`body: ${e.body}`)
  if (e.message) console.log(`message: ${e.message}`)
}

const getChain = (network: Network): Chain => {
  switch (network.name) {
    case "Ethereum":
      return mainnet
    case "Arbitrum":
      return arbitrum
    case "Optimism":
      return optimism
    case "Polygon":
      return polygon
    default:
      return bsc
  }
}

const rerange = async () => {
  const network = networks.POLYGON
  const contractAddress = process.env.SSL_CONTRACT_ADDRESS as `0x${string}`
  try {
    const account = privateKeyToAccount(`0x${process.env.PK}`)

    const client = createPublicClient({
      chain: getChain(network),
      transport: http(network.rpc),
    })

    const wallet = createWalletClient({
      account,
      chain: getChain(network),
      transport: http(network.rpc),
    })

    const contract = getContract({
      address: contractAddress as `0x${string}`,
      abi: SSL_ABI,
      publicClient: client,
      walletClient: wallet,
    })

    const isInRange = await contract.read.isInRange()
    const now = new Date()

    if (!isInRange) {
      const gas = await client.estimateContractGas({
        address: contractAddress as `0x${string}`,
        abi: SSL_ABI,
        functionName: "rerange",
        account,
      })
      await contract.write.rerange({ gas })

      console.log(
        `Rerange completed for ${contractAddress} on ${
          network.name
        } at ${now.toLocaleString()}`
      )
    }
  } catch (e) {
    printException(e)
    console.log(`Error reranging on network: ${network.name}`)
  }
}

const main = async () => {
  await rerange()
  setInterval(rerange, 600_000)
}

console.log("Starting rerange bot...")
main().catch((e) => console.log(e))
