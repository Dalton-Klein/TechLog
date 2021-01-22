import * as React from 'react';
import { useState } from 'react';

import './EditReport.css';

import * as rest from '../../Utils/rest';

import GetForm from '../../Form/GetForm'
import Form from '../../Form/Form'

interface EditReportProps {
  editReport: string;
}

interface IReport {
  _id?: string,
  title: string,
  tags: string[],
  description: string,
  steps: string[],
  images?: string[]
}

const EditReport : React.FC<EditReportProps> = ({editReport}) => {

  const [formEditState, setFormEdit] = useState<IReport | null>(null);

  const formFetch = async (reportId: string) => {
    const report = await rest.getReport(reportId);
    if (report) setFormEdit(report);
    else setFormEdit(null);
  }

  const formPatch = (title: string, searchTags: string[], description:string, steps: string[]) => {
    const { _id } = formEditState![0];
    const formCopy = { _id, title, tags:searchTags, description, steps}
    rest.editReport(formCopy);
    setFormEdit(null);
  }

  return (
    <div className="edit__report__container">
    {
    formEditState === null ? <GetForm editReport={editReport} formFetch={formFetch}/> :
    <Form form={formEditState[0]} formPatch={formPatch} formSubmit={(title, searchTags, description, steps, pics) => {}}/>
    }
  </div>
  )
}

export default EditReport;
