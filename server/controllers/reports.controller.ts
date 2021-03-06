import { Response , Request} from 'express';
import { IReport } from 'models/reports.models/reports.schema';
import * as Reports from '../models/reports.models/reports.model';

 export const allReports = async (_ : Request, res : Response) : Promise<void> => {
  try {
    const reports = await Reports.allReports();
    res.status(200).send(reports);
  } catch (err) {
    console.log('Return all reports error', err);
    res.status(500).send('Return all reports error');
  }
}

export const getReport = async (req : Request, res : Response) : Promise<void> => {
  try {
    const reply = await Reports.getReport(req.params.id);
    if (!reply) res.status(404).send('Report not found')
    else res.status(200).send(reply);
  } catch (err) {
    if (err.kind === 'ObjectId') res.status(404).send('Report not found')
    else res.status(500).send('Return single report error');
  }
}

export const newReport = async (req : Request, res : Response) : Promise<void> => {
  try {
    const data : IReport = req.body;
    const reply = await Reports.newReport(data);
    res.status(201).send(reply);
  } catch (err) {
    if (err._message === 'Report validation failed') res.status(400).send('Invalid Report Format')
    else res.status(500).send('Create new report error');
  }
}

export const editReport = async (req : Request, res : Response) => {
  try {
    const { _id, title, description, tags, steps } = req.body;
    const data : IReport = { title, description, tags, steps }
    const reply = await Reports.editReport(_id, data);
    if (!reply) res.status(404).send('Report not found')
    else res.status(200).send(reply);
  } catch (err) {
    console.log('Edit report error', err);
    res.status(500).send('Edit report error');
  }
}

export const deleteReport = async (req : Request, res : Response) => {
  try {
    const reply = await Reports.deleteReport(req.params.id);
    if (!reply) res.status(404).send('Report does not exist')
    else res.status(200).send(reply);
  } catch (err) {
    console.log('Delete report error', err);
    res.status(500).send('Delete report error');
  }
}
