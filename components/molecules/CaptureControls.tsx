import { PhotoType } from "@/types/capture.d";
import { Camera, Save, X } from "lucide-react";
const CaptureControls: React.FC<{
  tempPhoto: PhotoType | null;
  isPositionCorrect: boolean;
  onCapture: () => void;
  onSave: () => void;
  cancelCapture: () => void;
}> = ({ tempPhoto, isPositionCorrect, onCapture, onSave, cancelCapture }) => (
  <div className="flex justify-center space-x-4">
    {tempPhoto ? (
      <div className="flex justify-center gap-10 mt-10">
        <button onClick={cancelCapture} className="flex items-center px-4 py-2 bg-gray-200 rounded">
          <X className="w-4 h-4 mr-2" />
          <span>キャンセル</span>
        </button>
        <button onClick={onSave} className="flex items-center px-4 py-2 bg-blue-500 text-white rounded">
          <Save className="w-4 h-4 mr-2" />
          <span>保存</span>
        </button>
      </div>
    ) : (
      <button
        onClick={onCapture}
        disabled={!isPositionCorrect}
        className={`p-4 rounded-full ${isPositionCorrect ? 'bg-blue-500' : 'bg-gray-300'}`}
      >
        <Camera className="w-6 h-6 text-white" />
      </button>
    )}
  </div>
);

export default CaptureControls;