import {IReport} from './interfaces';

const BASE_URL = process.env.REACT_APP_BACKEND_URL as string;
const PIC_URL = process.env.REACT_APP_CLOUDINARY_URL as string;

const getReports = async () : Promise<IReport[] | undefined>  => {
  try {
    const response = await fetch(BASE_URL + 'allreports')
    return await response.json();
  } catch (error) {
    if(process.env.NODE_ENV !== 'test') console.log('Fetch error', error)
  }
  return;
}

const getReport = async (id: string ): Promise<IReport | undefined> => {
  try {
    const response = await fetch(BASE_URL + `getreport/${id}`);
    return await response.json();

  } catch (error) {
    if(process.env.NODE_ENV !== 'test') console.log('Fetch error', error);
  }
  return;
}

const postReport = async (title: string, tags: string[], description: string, steps: string[], pics: File[]): Promise<void> => {
  //Format + upload pics if required
  let images : string[] = await uploadPics(pics);
  try {
    await fetch(BASE_URL + 'postreport', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({title, tags, description, steps, images})
    });
  } catch (error) {
    if(process.env.NODE_ENV !== 'test')  console.log('Fetch error (SERVER)', error)
  }
}

const uploadPics = async (pics : File[]) : Promise<string[]> => {

  let picsUrls : string[] = [];

  if (pics.length > 0) {
    //Config pics before fetch - async doesn't work inside forEach...
    for (const pic of pics) {
      const formData = new FormData();
      formData.append('file', pic);
      formData.append('upload_preset', process.env.REACT_APP_PRESET_KEY as string);

      try {
        const res = await fetch(PIC_URL, {
          method: 'POST',
          body: formData,
        })
        const data = await res.json();
        picsUrls.push(data.url)
        return picsUrls;
      } catch (error) {
        if(process.env.NODE_ENV !== 'test') console.log('Fetch error (CLOUDINARY)', error)
      }
    }
  }
  return [];
}

const editReport = async (formCopy: IReport) : Promise<void> => {
  try  {
    await fetch(BASE_URL + 'editreport', {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formCopy)
    })
  } catch (err) {
    if(process.env.NODE_ENV !== 'test') console.log('Fetch error', err)
  }
}

const deleteReport = async (id: string) : Promise<void>  => {
  try {
    await fetch(BASE_URL + `deletereport/${id}`, {
      method: 'DELETE'
    })
  } catch (err) {
    if(process.env.NODE_ENV !== 'test') console.log('Fetch error', err)
  }
}

const rest = {
  getReports,
  getReport,
  postReport,
  uploadPics,
  deleteReport,
  editReport
}
export default rest;
