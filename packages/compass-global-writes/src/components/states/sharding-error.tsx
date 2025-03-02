import React from 'react';
import {
  Banner,
  BannerVariant,
  Button,
  css,
  spacing,
  SpinLoader,
} from '@mongodb-js/compass-components';
import { connect } from 'react-redux';
import {
  cancelSharding,
  type RootState,
  ShardingStatuses,
} from '../../store/reducer';
import CreateShardKeyForm from '../create-shard-key-form';
import { containerStyles, bannerStyles } from '../common-styles';

const btnStyles = css({
  float: 'right',
  height: spacing[600],
});

const errorStyles = css({
  marginTop: spacing[200],
  whiteSpace: 'pre-wrap',
  textAlign: 'left',
});

interface ShardingErrorProps {
  shardingError: string;
  isCancellingSharding: boolean;
  isSubmittingForSharding: boolean;
  onCancelSharding: () => void;
}

export function ShardingError({
  shardingError,
  isCancellingSharding,
  isSubmittingForSharding,
  onCancelSharding,
}: ShardingErrorProps) {
  return (
    <div className={containerStyles}>
      <Banner variant={BannerVariant.Danger} className={bannerStyles}>
        There was an error sharding your collection. Please cancel the request,
        make any necessary changes to your collection, and try again.
        <div className={errorStyles}>{shardingError}</div>
        <Button
          className={btnStyles}
          data-testid="cancel-sharding-btn"
          disabled={isCancellingSharding || isSubmittingForSharding}
          isLoading={isCancellingSharding}
          loadingIndicator={<SpinLoader />}
          onClick={onCancelSharding}
        >
          Cancel Request
        </Button>
      </Banner>
      <CreateShardKeyForm />
    </div>
  );
}

export default connect(
  (state: RootState) => {
    if (!state.shardingError) {
      throw new Error('No shardingError found in ShardingError component');
    }
    return {
      shardingError: state.shardingError,
      isCancellingSharding:
        state.status === ShardingStatuses.CANCELLING_SHARDING_ERROR,
      isSubmittingForSharding:
        state.status === ShardingStatuses.SUBMITTING_FOR_SHARDING_ERROR,
    };
  },
  {
    onCancelSharding: cancelSharding,
  }
)(ShardingError);
