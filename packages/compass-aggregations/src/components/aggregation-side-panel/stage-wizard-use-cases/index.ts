import UseCaseList from './use-case-list';
import SortUseCase from './sort/sort';
import LookupUseCase from './lookup/lookup';
import ProjectUseCase from './project/project';
import BasicGroupUseCase from './group/basic-group';
import GroupWithStatistics from './group/group-with-statistics';
import GroupWithSubset from './group/group-with-subset';

export type StageWizardUseCase = {
  id: string;
  title: string;
  stageOperator: string;
  wizardComponent: React.FunctionComponent<{
    fields: string[];
    onChange: (value: string, validationError: Error | null) => void;
  }>;
  serverVersion?: string;
};

export const STAGE_WIZARD_USE_CASES: StageWizardUseCase[] = [
  {
    id: 'sort',
    title:
      'Sort documents in [ascending/descending] order based on a single or a set of fields',
    stageOperator: '$sort',
    wizardComponent: SortUseCase,
  },
  {
    id: 'lookup',
    title:
      'Join documents from different collections to compare their field values',
    stageOperator: '$lookup',
    wizardComponent: LookupUseCase,
  },
  {
    id: 'project',
    title: 'Include or exclude a subset of fields from my documents',
    stageOperator: '$project',
    wizardComponent: ProjectUseCase,
  },
  {
    id: 'basic-group',
    title: 'Group my documents based on their field values',
    stageOperator: '$group',
    wizardComponent: BasicGroupUseCase,
  },
  {
    id: 'group-with-statistics',
    title: 'Compute values within the groups I create',
    stageOperator: '$group',
    wizardComponent: GroupWithStatistics,
  },
  {
    id: 'group-with-subset',
    title: 'Return a  subset of values based on their order or rank',
    stageOperator: '$group',
    wizardComponent: GroupWithSubset,
  },
];

export { UseCaseList };
