import { useCreateRevenuePath, useR3vlClient } from '@r3vl/sdk'
import { useEffect, useState } from 'react'
import { useNetwork, useProvider, useSigner } from 'wagmi'

const Form = ({ onCreateRevPath }) => {
  const [collab1, setCollab1] = useState(0)
  const [collab2, setCollab2] = useState(0)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (collab1 === undefined && collab2 === undefined) return

    const totalShare = collab1 + collab2

    if (totalShare === 100) setError(null)
    else setError('Total share must sum 100%')
  }, [collab1, collab2, error])

  return (
    <div>
      <p>Collaborator 1 0x01</p>
      {false && <input placeholder="Share in percentage" onChange={e => setCollab1(parseFloat(e.target.value))} />}
      <p>Collaborator 2 0x02</p>
      {false && <input placeholder="Share in percentage" onChange={e => setCollab2(parseFloat(e.target.value))} />}
      <p>
        <button
          onClick={() =>
            onCreateRevPath({
              walletList: [
                ['0xcf581538f7e6251aa7ff52edbaac3f86a0de7ea0', '0x1b90cc907694e8dbb920a7e12231677afff786ed'],
              ],
              distribution: [[60, 40]],
              name: 'rev path test',
              mutabilityDisabled: true,
            })
          }
        >
          Create Revenue Path!
        </button>
      </p>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  )
}

const Sdk = () => {
  const provider = useProvider()
  const { data: signer } = useSigner()
  const { chain } = useNetwork()

  useR3vlClient({
    chainId: chain?.id,
    provider,
    signer,
  })

  const { mutateAsync: createRevenuePath } = useCreateRevenuePath({
    customGasLimit: 210000,
  })

  const onCreateRevPath = async payload => {
    const receipt = await createRevenuePath(payload)

    console.log('Transaction result:', receipt)
  }

  return <Form onCreateRevPath={onCreateRevPath} />
}

export default Sdk
