import React, {PropsWithChildren, useState} from 'react';
import {useAppVersionGuard} from '../model/useAppVersionGuard';
import {useEffectOnce} from '@/shared/lib/useEffectOnce';

function VersionGuard({children}: PropsWithChildren) {
  const {checkVersion, showNeedUpdateAlert} = useAppVersionGuard();
  const [isAllowed, setIsAllowed] = useState(false);

  useEffectOnce(async () => {
    const [isNeeded, storeUrl] = await checkVersion();
    if (isNeeded) return showNeedUpdateAlert(storeUrl);
    setIsAllowed(true);
    // checkIsLogined()
  });

  if (!isAllowed) return null;
  return <>{children}</>;
}

export {VersionGuard};
