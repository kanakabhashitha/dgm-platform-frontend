import { AiOutlineEdit } from "react-icons/ai";
import { MdOutlineDeleteOutline } from "react-icons/md";
import { GrView } from "react-icons/gr";
import { useDispatch } from "react-redux";
import { openViewModel, openEditModel } from "../store/toggle";

function DataTable({
  columns,
  data,
  isShowActionSection,
  isShowViewBtn,
  isShowEditBtn,
  isShowDeleteBtn,
}) {
  const dispatch = useDispatch();

  return (
    <table className="w-full text-gray-700 text-sm text-center capitalize border border-collapse border-gray-200 table-auto">
      <thead>
        <tr className="border-b border-gray-200 ">
          {columns.map((column) => (
            <th key={column.accessor} className="p-4">
              {column.label}
            </th>
          ))}
          {isShowActionSection && <th>Action</th>}
        </tr>
      </thead>
      <tbody>
        {data.map((row) => (
          <tr key={row.id} className="text-sm border-b">
            {columns.map((column) => (
              <td key={column.accessor} className="p-2 border">
                {typeof column.accessor === "function"
                  ? column.accessor(row)
                  : row[column.accessor]}
              </td>
            ))}
            {isShowActionSection && (
              <td>
                {isShowViewBtn && (
                  <button
                    onClick={() => dispatch(openViewModel(row))}
                    className="p-1 text-base text-white border rounded-sm border-cyan bg-cyan-md hover:text-black"
                  >
                    <GrView />
                  </button>
                )}
                {isShowEditBtn && (
                  <button
                    onClick={() => dispatch(openEditModel(row))}
                    className="p-1 ml-1 mr-1 text-base text-white bg-yellow-500 border border-yellow-600 rounded-sm hover:text-black"
                  >
                    <AiOutlineEdit />
                  </button>
                )}
                {isShowDeleteBtn && (
                  <button className="p-1 text-base text-white bg-red-500 border border-red-600 rounded-sm hover:text-black">
                    <MdOutlineDeleteOutline />
                  </button>
                )}
              </td>
            )}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default DataTable;
