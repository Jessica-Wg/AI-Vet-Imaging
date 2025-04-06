import React, { useState, useRef } from 'react';
import { Upload, FileType, History, X, Microscope, FlaskRound as Flask, ChevronRight, AlertCircle, CheckCircle2, Ban, Loader2, Save } from 'lucide-react';

interface PatientHistory {
  previousVisits: {
    date: string;
    reason: string;
    diagnosis: string;
    treatment: string;
  }[];
  labResults: {
    date: string;
    type: string;
    result: string;
    status: 'normal' | 'abnormal' | 'critical';
  }[];
  medications: {
    name: string;
    dosage: string;
    frequency: string;
    startDate: string;
    endDate?: string;
  }[];
}

interface Analysis {
  id: string;
  timestamp: Date;
  imageUrl: string;
  findings: {
    description: string;
    confidence: number;
    severity: 'low' | 'medium' | 'high';
    location: string;
  }[];
  overallConfidence: number;
  patientInfo: {
    id: string;
    name: string;
    species: string;
    breed: string;
    age: number;
    weight: string;
    sex: 'male' | 'female';
  };
  aiSuggestions: {
    diagnosis: string;
    confidence: number;
    differentials: string[];
    recommendedTests: string[];
    treatmentPlan: string[];
  };
  history: PatientHistory;
}

function App() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [activeTab, setActiveTab] = useState<'analysis' | 'history' | 'labs'>('analysis');
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [analysis, setAnalysis] = useState<Analysis | null>(null);
  const [savedAnalyses, setSavedAnalyses] = useState<Analysis[]>([]);
  const [isSaving, setIsSaving] = useState(false);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result as string);
        simulateAnalysis();
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSaveAnalysis = () => {
    if (analysis) {
      setIsSaving(true);
      setTimeout(() => {
        const updatedAnalysis = {
          ...analysis,
          history: {
            ...analysis.history,
            previousVisits: [
              {
                date: new Date().toISOString().split('T')[0],
                reason: "AI Analysis",
                diagnosis: analysis.aiSuggestions.diagnosis,
                treatment: analysis.aiSuggestions.treatmentPlan.join(", ")
              },
              ...analysis.history.previousVisits
            ]
          }
        };
        setSavedAnalyses(prev => [...prev, updatedAnalysis]);
        
        setAnalysis(null);
        setSelectedImage(null);
        setIsSaving(false);
        setActiveTab('history');
      }, 1000);
    }
  };

  const simulateAnalysis = () => {
    setIsAnalyzing(true);
    setTimeout(() => {
      const newAnalysis: Analysis = {
        id: Math.random().toString(36).substr(2, 9),
        timestamp: new Date(),
        imageUrl: selectedImage!,
        findings: [
          {
            description: "Early signs of arthritis in left hip joint",
            confidence: 0.92,
            severity: 'medium',
            location: "Left hip"
          },
          {
            description: "No significant abnormalities in spine alignment",
            confidence: 0.95,
            severity: 'low',
            location: "Spine"
          },
          {
            description: "Minor inflammation in knee area",
            confidence: 0.88,
            severity: 'low',
            location: "Right knee"
          }
        ],
        overallConfidence: 0.89,
        patientInfo: {
          id: "PAT-2024-001",
          name: "Max",
          species: "Canine",
          breed: "German Shepherd",
          age: 5,
          weight: "32.5 kg",
          sex: 'male'
        },
        aiSuggestions: {
          diagnosis: "Early-stage hip dysplasia with minor arthritic changes",
          confidence: 0.87,
          differentials: [
            "Degenerative Joint Disease",
            "Traumatic Injury",
            "Growth-related Disorder"
          ],
          recommendedTests: [
            "Complete Blood Count",
            "Serum Chemistry Panel",
            "Synovial Fluid Analysis"
          ],
          treatmentPlan: [
            "Anti-inflammatory medication",
            "Physical therapy",
            "Weight management",
            "Regular exercise modification"
          ]
        },
        history: {
          previousVisits: savedAnalyses.length > 0 
            ? savedAnalyses[savedAnalyses.length - 1].history.previousVisits 
            : [
                {
                  date: "2024-01-15",
                  reason: "Annual checkup",
                  diagnosis: "Healthy, mild joint stiffness noted",
                  treatment: "Recommended joint supplements"
                },
                {
                  date: "2023-08-22",
                  reason: "Limping",
                  diagnosis: "Muscle strain",
                  treatment: "Rest and anti-inflammatory medication"
                }
              ],
          labResults: savedAnalyses.length > 0
            ? savedAnalyses[savedAnalyses.length - 1].history.labResults
            : [
                {
                  date: "2024-01-15",
                  type: "Complete Blood Count",
                  result: "Within normal ranges",
                  status: "normal"
                },
                {
                  date: "2023-08-22",
                  type: "Joint Fluid Analysis",
                  result: "Elevated inflammatory markers",
                  status: "abnormal"
                }
              ],
          medications: savedAnalyses.length > 0
            ? savedAnalyses[savedAnalyses.length - 1].history.medications
            : [
                {
                  name: "Glucosamine/Chondroitin",
                  dosage: "1500mg/1200mg",
                  frequency: "Daily",
                  startDate: "2024-01-15"
                }
              ]
        }
      };
      
      setAnalysis(newAnalysis);
      setIsAnalyzing(false);
      setActiveTab('analysis');
    }, 2000);
  };

  const currentHistory = analysis?.history || (savedAnalyses.length > 0 ? savedAnalyses[savedAnalyses.length - 1].history : null);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white shadow-sm p-4 flex items-center justify-between">
        <h1 className="text-xl font-semibold text-gray-800">VetAI Vision</h1>
        <div className="flex items-center space-x-4">
          <button
            onClick={() => setActiveTab('analysis')}
            className={`px-4 py-2 rounded-lg ${
              activeTab === 'analysis'
                ? 'bg-blue-100 text-blue-700'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            Analysis
          </button>
          <button
            onClick={() => setActiveTab('history')}
            className={`px-4 py-2 rounded-lg ${
              activeTab === 'history'
                ? 'bg-blue-100 text-blue-700'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            History
          </button>
          <button
            onClick={() => setActiveTab('labs')}
            className={`px-4 py-2 rounded-lg ${
              activeTab === 'labs'
                ? 'bg-blue-100 text-blue-700'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            Labs
          </button>
          {analysis && !isAnalyzing && (
            <button
              onClick={handleSaveAnalysis}
              disabled={isSaving}
              className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSaving ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <Save className="w-5 h-5" />
              )}
              <span>{isSaving ? 'Saving...' : 'Save Diagnostic'}</span>
            </button>
          )}
        </div>
      </div>

      <div className="p-6">
        {activeTab === 'analysis' && (
          <div className="mb-8">
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleImageUpload}
              accept="image/*"
              className="hidden"
            />
            <div 
              onClick={() => fileInputRef.current?.click()}
              className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center cursor-pointer hover:border-blue-500 transition-colors"
            >
              {selectedImage ? (
                <img src={selectedImage} alt="Selected" className="max-h-96 mx-auto rounded-lg" />
              ) : (
                <div>
                  <FileType className="w-12 h-12 mx-auto text-gray-400 mb-4" />
                  <p className="text-gray-600">Click or drag image to upload</p>
                  <p className="text-sm text-gray-500 mt-2">Supports X-rays, ultrasounds, and other medical imaging</p>
                </div>
              )}
            </div>
          </div>
        )}

        {isAnalyzing && (
          <div className="text-center py-8">
            <Loader2 className="w-12 h-12 animate-spin mx-auto mb-4 text-blue-500" />
            <p className="text-gray-600">Processing image...</p>
            <p className="text-sm text-gray-500">Please wait while we analyze the results</p>
          </div>
        )}

        {(analysis || savedAnalyses.length > 0) && (
          <div className="space-y-6">
            {activeTab === 'analysis' && analysis && (
              <div className="space-y-6">
                <div className="bg-white rounded-lg shadow p-6">
                  <h2 className="text-xl font-semibold text-gray-800 mb-4">Patient Information</h2>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <p className="text-sm text-gray-500">Name</p>
                      <p className="font-medium">{analysis.patientInfo.name}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Species</p>
                      <p className="font-medium">{analysis.patientInfo.species}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Breed</p>
                      <p className="font-medium">{analysis.patientInfo.breed}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Age</p>
                      <p className="font-medium">{analysis.patientInfo.age} years</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Weight</p>
                      <p className="font-medium">{analysis.patientInfo.weight}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Sex</p>
                      <p className="font-medium">{analysis.patientInfo.sex}</p>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-lg shadow p-6">
                  <h2 className="text-xl font-semibold text-gray-800 mb-4">AI Analysis Findings</h2>
                  <div className="space-y-4">
                    {analysis.findings.map((finding, index) => (
                      <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                        <div className="flex-1">
                          <p className="font-medium text-gray-900">{finding.description}</p>
                          <p className="text-sm text-gray-600">Location: {finding.location}</p>
                        </div>
                        <div className="ml-4 flex items-center">
                          <div className={`px-3 py-1 rounded-full text-sm font-medium ${
                            finding.severity === 'high' 
                              ? 'bg-red-100 text-red-800'
                              : finding.severity === 'medium'
                              ? 'bg-yellow-100 text-yellow-800'
                              : 'bg-green-100 text-green-800'
                          }`}>
                            {(finding.confidence * 100).toFixed(0)}% confidence
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-white rounded-lg shadow p-6">
                  <h2 className="text-xl font-semibold text-gray-800 mb-4">AI Diagnostic Suggestions</h2>
                  <div className="space-y-6">
                    <div>
                      <h3 className="font-medium text-gray-900 mb-2">Primary Diagnosis</h3>
                      <p className="text-gray-800 bg-blue-50 p-3 rounded-lg">
                        {analysis.aiSuggestions.diagnosis}
                        <span className="ml-2 text-sm text-blue-600">
                          ({(analysis.aiSuggestions.confidence * 100).toFixed(0)}% confidence)
                        </span>
                      </p>
                    </div>

                    <div>
                      <h3 className="font-medium text-gray-900 mb-2">Differential Diagnoses</h3>
                      <ul className="list-disc list-inside space-y-1 text-gray-700">
                        {analysis.aiSuggestions.differentials.map((diff, index) => (
                          <li key={index}>{diff}</li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <h3 className="font-medium text-gray-900 mb-2">Recommended Tests</h3>
                      <ul className="list-disc list-inside space-y-1 text-gray-700">
                        {analysis.aiSuggestions.recommendedTests.map((test, index) => (
                          <li key={index}>{test}</li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <h3 className="font-medium text-gray-900 mb-2">Suggested Treatment Plan</h3>
                      <ul className="list-disc list-inside space-y-1 text-gray-700">
                        {analysis.aiSuggestions.treatmentPlan.map((plan, index) => (
                          <li key={index}>{plan}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'history' && currentHistory && (
              <div className="bg-white rounded-lg shadow p-6">
                <h2 className="text-xl font-semibold text-gray-800 mb-6">Previous Visits</h2>
                <div className="space-y-4">
                  {currentHistory.previousVisits.map((visit, index) => (
                    <div key={index} className="border-l-4 border-blue-500 pl-4 py-2">
                      <div className="flex items-center justify-between">
                        <p className="font-medium text-gray-900">{visit.date}</p>
                        <span className="text-sm text-gray-500">{visit.reason}</span>
                      </div>
                      <p className="text-gray-600 mt-1">Diagnosis: {visit.diagnosis}</p>
                      <p className="text-gray-600">Treatment: {visit.treatment}</p>
                    </div>
                  ))}
                </div>

                <h2 className="text-xl font-semibold text-gray-800 mt-8 mb-6">Current Medications</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {currentHistory.medications.map((med, index) => (
                    <div key={index} className="bg-gray-50 p-4 rounded-lg">
                      <p className="font-medium text-gray-900">{med.name}</p>
                      <p className="text-sm text-gray-600">Dosage: {med.dosage}</p>
                      <p className="text-sm text-gray-600">Frequency: {med.frequency}</p>
                      <p className="text-sm text-gray-600">Started: {med.startDate}</p>
                      {med.endDate && <p className="text-sm text-gray-600">Ended: {med.endDate}</p>}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'labs' && currentHistory && (
              <div className="bg-white rounded-lg shadow p-6">
                <h2 className="text-xl font-semibold text-gray-800 mb-6">Laboratory Results</h2>
                <div className="space-y-4">
                  {currentHistory.labResults.map((lab, index) => (
                    <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div>
                        <p className="font-medium text-gray-900">{lab.type}</p>
                        <p className="text-sm text-gray-600">{lab.date}</p>
                        <p className="text-gray-700 mt-1">{lab.result}</p>
                      </div>
                      <div className="flex items-center">
                        {lab.status === 'normal' ? (
                          <CheckCircle2 className="w-6 h-6 text-green-500" />
                        ) : lab.status === 'abnormal' ? (
                          <AlertCircle className="w-6 h-6 text-yellow-500" />
                        ) : (
                          <Ban className="w-6 h-6 text-red-500" />
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;