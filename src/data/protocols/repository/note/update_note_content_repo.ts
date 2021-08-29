import { UpdateNoteContent } from '@/core/use_cases/note';

export interface UpdateNoteContentRepository {
  updateContent: (
    params: UpdateNoteContentRepository.Params,
  ) => Promise<UpdateNoteContentRepository.Result>;
}

export namespace UpdateNoteContentRepository {
  export type Params = UpdateNoteContent.Params;
  export type Result = UpdateNoteContent.Result;
}
