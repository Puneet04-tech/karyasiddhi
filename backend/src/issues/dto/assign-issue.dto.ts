import { IsUUID } from 'class-validator';

export class AssignIssueDto {
  @IsUUID()
  issueId: string;

  @IsUUID()
  assigneeId: string;
}