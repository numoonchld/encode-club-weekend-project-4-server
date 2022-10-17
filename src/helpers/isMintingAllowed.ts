import currentEpoch from './currentEpoch';
import * as G11TokenJSON from '../contract-assets/token-contract/G11Token.address.json';

export default (lastMintEpoch: number) => {
  const epochDelta = Math.abs(currentEpoch() - lastMintEpoch);
  return epochDelta > G11TokenJSON['MINTING_COOLING_PERIOD_EPOCH_DELTA'];
};
