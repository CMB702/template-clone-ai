import { useParams } from 'react-router-dom'
import { Download, Undo2, Redo2 } from 'lucide-react'

export default function Editor() {
  const { projectId } = useParams()

  return (
    <div className="min-h-screen bg-gray-900 flex flex-col">
      {/* Toolbar */}
      <div className="bg-gray-800 border-b border-gray-700 px-6 py-4 flex justify-between items-center">
        <h1 className="text-white font-semibold">Project {projectId}</h1>
        <div className="flex gap-4">
          <button className="text-gray-400 hover:text-white">
            <Undo2 size={20} />
          </button>
          <button className="text-gray-400 hover:text-white">
            <Redo2 size={20} />
          </button>
          <button className="bg-blue-600 text-white px-4 py-2 rounded flex items-center gap-2 hover:bg-blue-700">
            <Download size={20} />
            Export
          </button>
        </div>
      </div>

      <div className="flex flex-1 overflow-hidden">
        {/* Left Sidebar - Layers */}
        <div className="w-64 bg-gray-800 border-r border-gray-700 overflow-y-auto">
          <div className="p-4">
            <h2 className="text-white font-semibold mb-4">Layers</h2>
            <div className="space-y-2">
              <div className="p-2 bg-gray-700 rounded text-white text-sm cursor-pointer hover:bg-gray-600">
                Layer 1
              </div>
            </div>
          </div>
        </div>

        {/* Canvas Area */}
        <div className="flex-1 flex items-center justify-center bg-gray-900">
          <div className="bg-white rounded-lg shadow-lg w-full h-full m-4">
            <canvas className="w-full h-full rounded-lg" />
          </div>
        </div>

        {/* Right Sidebar - Properties */}
        <div className="w-64 bg-gray-800 border-l border-gray-700 overflow-y-auto">
          <div className="p-4">
            <h2 className="text-white font-semibold mb-4">Properties</h2>
            <div className="space-y-4">
              <div>
                <label className="text-gray-400 text-sm">Fill Color</label>
                <input type="color" className="w-full mt-2 rounded cursor-pointer" />
              </div>
              <div>
                <label className="text-gray-400 text-sm">Font Size</label>
                <input type="number" className="w-full mt-2 px-3 py-2 rounded bg-gray-700 text-white" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
