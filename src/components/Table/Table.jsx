import React, {useEffect, useState} from 'react';
import "./Table.css"
import useSortableData from "../../hooks/sortableData";
import GridService from "../../API/GridService";
import Loader from "../../UI/Loader/Loader";
import {getPageCount, getPagesArray} from "../../utils/pages";

const Table = () => {
    const [isLoaded, setIsLoaded] = useState(false);
    const [data, setData] = useState([]);
    /*Сколько всего постов*/
    const [totalPages, setTotalPages] = useState(0)

    /*Кол-во элементов на страницу, следующее состояние - номер страницы*/
    const [limit, setLimit] = useState(5)
    const [page, setPage] = useState(1)

    /*фильтры*/
    const [filter, setFilter] = React.useState("");
    const [columnSearch, setColumnSearch] = useState("name")

    let pagesArray = getPagesArray(totalPages)
    const {items, requestSort, sortConfig} = useSortableData(data);//props data
    const getClassNamesFor = (name) => {
        if (!sortConfig) {
            return;
        }
        return sortConfig.key === name ? sortConfig.direction : undefined;
    };

    async function fetchData() {
        let response = await GridService.getAll(limit, page)
        setData(response.data);
        /*Общее кол-во записей в апи*/
        const totalCount = response.headers['x-total-count']
        //Сколько всего страниц
        setTotalPages(getPageCount(totalCount, limit))
        setIsLoaded(true);

    }

    useEffect(() => {
        fetchData()
    }, [page])

    const changePage = (p) => {
        setPage(p)
    }
    return (
        <div>
            {!isLoaded
                ? <div style={{display: "flex", justifyContent: "center", alignItems: "center"}}><Loader/></div>
                : <>
                    <input
                        value={filter}
                        onChange={({target: {value}}) => setFilter(value)}
                        id="filter"
                    />
                    <select onChange={(e)=>setColumnSearch(e.target.value)} value={columnSearch} name="" id="">
                        <option value="name">Имя</option>
                        <option value="lastname">Фамилия</option>
                        <option value="city">город</option>
                    </select>


                    <table className="table main__table">
                        <thead>
                        <tr>
                            <th onClick={() => requestSort('id')}
                                className={getClassNamesFor('id')}>#ID
                            </th>
                            <th onClick={() => requestSort('name')}
                                className={getClassNamesFor('name')}>Имя
                            </th>
                            <th onClick={() => requestSort('lastname')}
                                className={getClassNamesFor('lastname')}>Фамилия
                            </th>
                            <th onClick={() => requestSort('age')}
                                className={getClassNamesFor('age')}>Возраст
                            </th>
                            <th onClick={() => requestSort('city')}
                                className={getClassNamesFor('city')}>Город
                            </th>
                            <th onClick={() => requestSort('job')}
                                className={getClassNamesFor('job')}>Должность
                            </th>
                            <th onClick={() => requestSort('online')}
                                className={getClassNamesFor('online')}>Онлайн
                            </th>
                        </tr>
                        </thead>
                        <tbody>

                        {items
                            /* item.lastname.toLowerCase().includes(filter.toLowerCase())*/
                            .filter((item) => item[columnSearch].toLowerCase().includes(filter.toLowerCase()))
                            .map((item) => (
                                <tr key={item.id}>
                                    <th>{item.id}</th>
                                    <td>{item.name}</td>
                                    <td>{item.lastname}</td>
                                    <td>{item.age}</td>
                                    <td>{item.city}</td>
                                    <td>{item.job}</td>
                                    <td>{item.online}</td>
                                </tr>
                            ))

                        }


                        </tbody>
                    </table>
                </>
            }
            {pagesArray.map(p =>
                <button
                    onClick={() => changePage(p)}
                    style={page === p ? {background: "#04AA6D"} : {}}
                    key={p}>{p}
                </button>
            )}
        </div>
    );
};

export default Table;