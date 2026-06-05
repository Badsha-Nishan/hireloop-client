"use client";

import { Table, Chip } from "@heroui/react";
import { Eye, Pencil, TrashBin } from "@gravity-ui/icons";

const statusColor = (status) => {
  if (status === "active") return "success";
  if (status === "inactive") return "danger";
  return "warning";
};

export default function RecruiterJobsTableClient({ jobs = [] }) {
  return (
    <Table>
      <Table.ResizableContainer>
        <Table.Content className="min-w-[900px]">
          <Table.Header>
            <Table.Column isRowHeader id="title">
              Job Title
            </Table.Column>

            <Table.Column id="category">Category</Table.Column>
            <Table.Column id="type">Type</Table.Column>
            <Table.Column id="salary">Salary</Table.Column>
            <Table.Column id="status">Status</Table.Column>
            <Table.Column id="actions">Actions</Table.Column>
          </Table.Header>

          <Table.Body>
            {jobs.map((job) => (
              <Table.Row key={job._id?.$oid || job._id}>
                <Table.Cell>
                  <div className="font-medium text-white">{job.jobTitle}</div>
                  <div className="text-xs text-zinc-500">{job.location}</div>
                </Table.Cell>

                <Table.Cell>{job.jobCategory}</Table.Cell>
                <Table.Cell>{job.jobType}</Table.Cell>

                <Table.Cell>
                  {job.minSalary} - {job.maxSalary} {job.currency}
                </Table.Cell>

                <Table.Cell>
                  <Chip
                    color={statusColor(job.status)}
                    size="sm"
                    variant="soft"
                  >
                    {job.status}
                  </Chip>
                </Table.Cell>

                <Table.Cell>
                  <div className="flex gap-3">
                    <Eye className="w-4 h-4 cursor-pointer" />
                    <Pencil className="w-4 h-4 cursor-pointer" />
                    <TrashBin className="w-4 h-4 cursor-pointer" />
                  </div>
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table.Content>
      </Table.ResizableContainer>
    </Table>
  );
}
