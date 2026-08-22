// Copyright (c) 2022 Joseph Hale <me@jhale.dev>
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0.

import {Attempt} from '../../lib/stif/wrappers';
import AttemptsChart from '../components/charts/AttemptsChart';
import AveragesTable from '../components/charts/AveragesTable';
import SplitScreen from '../layouts/SplitScreen';
import {StyleSheet} from 'react-native';
import {TimerTabScreenProps} from '../navigation/types';
import {useAttempts} from '../../persistence/hooks';
import {useCompetitiveEvent} from '../hooks/useCompetitiveEvent';
import ZaidSurface from '../components/zaid/ZaidSurface';

type Props = TimerTabScreenProps<'Insights'>;

export default function InsightsScreen(props: Props) {
  const [event] = useCompetitiveEvent();
  const stifs = useAttempts({event, sortDirection: 'descending'});
  const attempts: Attempt[] = [...stifs].map(a => new Attempt(a));

  return (
    <SplitScreen style={styles.container}>
      <ZaidSurface
        style={styles.panel}
        material="clear"
        cornerRadius={26}
        refractionHeight={54}
        bevelWidth={10}
        dispersionStrength={0.10}>
        <AttemptsChart attempts={attempts} />
      </ZaidSurface>

      <ZaidSurface
        style={styles.panel}
        material="clear"
        cornerRadius={26}
        refractionHeight={54}
        bevelWidth={10}
        dispersionStrength={0.10}>
        <AveragesTable
          attempts={attempts}
          averages={[
            {type: 'mean', size: 3},
            {type: 'trimmed', size: 5},
            {type: 'trimmed', size: 12},
            {type: 'trimmed', size: 50},
            {type: 'trimmed', size: 100},
            {type: 'trimmed', size: 1000},
          ]}
          perPage={3}
        />
      </ZaidSurface>
    </SplitScreen>
  );
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 10,
    marginTop: 10,
    marginBottom: 4,
    gap: 10,
  },

  panel: {
    flex: 1,
    borderRadius: 26,
    overflow: 'hidden',
  },
});
