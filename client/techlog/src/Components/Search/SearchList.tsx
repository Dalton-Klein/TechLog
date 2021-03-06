import * as React from 'react';
import { useState, useEffect } from 'react';
import './SearchList.css';
import { IReport } from '../../Utils/interfaces';
import animations from '../../Utils/animations';
import SearchBar from './SearchBar';
import SearchTags from './SearchTags';
import SearchItem from './SearchItem';
import rest from '../../Utils/rest';

interface SearchListProps {admin: boolean}

const SearchList :React.FC<SearchListProps> = ({ admin }) => {
  
  const [reports, setReports] = useState<IReport[]>([]);
  const [searchTags, setSearchTags] = useState<string[]>([]);

  //Initial render
  useEffect(() => {
    callReports();
  }, []);

  //Call for reports
  const callReports = async () => {
    const dbCall : IReport[] | undefined = await rest.getReports();
    if (dbCall) setReports(dbCall);
    animations.listItemAnimation();
  }

  //Add search tag
  const searchTagHandler = (value: string) => {
    const prevTags : string[] = [...searchTags];  //Copy as an array so a ref value
    if (!prevTags.includes(value)) prevTags.push(value);
    setSearchTags(prevTags);
  }

  //Delete search tag
  const deleteTagHandler = (eventTarget: string) => {
    const prevTags = [...searchTags];
    const filterTags = prevTags.filter(element => element !== eventTarget);
    setSearchTags(filterTags);
  }

  return (
    <div className="searchlist__container">

      <SearchBar
        data-testid="search-bar"
        searchTagHandler={searchTagHandler}
      />

      <ul
        className="searchlist__searchtags">
        {searchTags.length !== 0 &&
        searchTags.map((tag, index) => <SearchTags
          key={index}
          tag={tag}
          deleteTagHandler={() => deleteTagHandler(tag)}
        />)}
      </ul>

      <ul
        className="searchlist__searchitems">
        {reports.length !== 0 ?
        reports.map((report, index) => <SearchItem
          key={index}
          data-testid={`report-item-${index}`}
          admin={admin}
          id={report._id ? report._id  : ''}
          title={report.title}
          tags={report.tags}
          description={report.description}
          steps={report.steps}
          images={report.images}
          searchTags={searchTags}
          callReports={callReports}
        />)
        : null}
      </ul>
    </div>
  )
}

export default SearchList;
