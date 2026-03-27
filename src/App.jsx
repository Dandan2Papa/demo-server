import { useState } from "react";

const REPORT_TYPES = [
  { id: "planning", label: "기획보고서", icon: "📋", desc: "정책·사업 기획 및 추진 방향" },
  { id: "summary", label: "요약보고서", icon: "📄", desc: "핵심 내용 요약 및 현황 정리" },
  { id: "situation", label: "상황보고서", icon: "🔔", desc: "현안·이슈 상황 분석 및 대응" },
  { id: "meeting", label: "회의보고서", icon: "🗂️", desc: "회의 결과 및 협의사항 정리" },
  { id: "event-plan", label: "행사기획보고서", icon: "🗓️", desc: "행사 기획 및 세부 추진 계획" },
  { id: "event-schedule", label: "행사계획보고서", icon: "📌", desc: "행사 일정·운영 계획 수립" },
];

const STEP_QUESTIONS = [
  { id: 1, label: "어떤 주제의 보고서인가요?", placeholder: "예: 2026년 디지털 정부 혁신 추진 계획" },
  { id: 2, label: "보고서의 목적이 무엇인가요?", placeholder: "예: 장관 보고용 / 부서 내부 검토용" },
  { id: 3, label: "분량과 제출 기한은요?", placeholder: "예: A4 3페이지, 이번 주 금요일까지" },
];

const OUTLINE_SAMPLE = [
  "1. 추진 배경 및 필요성",
  "2. 현황 분석",
  "   2-1. 국내외 동향",
  "   2-2. 문제점 및 시사점",
  "3. 추진 전략",
  "   3-1. 핵심 과제",
  "   3-2. 단계별 로드맵",
  "4. 기대효과",
  "5. 향후 추진 일정",
];

const ONBOARDING_SCENARIOS = [
  {
    id: 1,
    title: "처음 쓰는 공무원용",
    subtitle: "15분 완성 가이드",
    color: "#22c55e",
    bg: "#f0fdf4",
    steps: [
      "로그인 후 '보고서 시작하기' 클릭",
      "보고서 유형 선택 (예: 기획보고서)",
      "AI 질문 3개 응답",
      "목차 확인 및 수정",
      "섹션별 초안 완성",
    ],
  },
  {
    id: 2,
    title: "기관 담당자용",
    subtitle: "RAG 구축 입문",
    color: "#3b82f6",
    bg: "#eff6ff",
    steps: [
      "지식 저장소 → 문서 업로드",
      "청킹/임베딩 설정 확인",
      "테스트 질의 5개 실행",
      "결과 품질 확인",
      "에이전트 연결 및 배포",
    ],
  },
  {
    id: 3,
    title: "보안 걱정 해소용",
    subtitle: "안심 사용 가이드",
    color: "#f59e0b",
    bg: "#fffbeb",
    steps: [
      "입력 데이터 처리 방식 확인",
      "써도 되는 데이터 vs 안 되는 데이터",
      "PII 마스킹 기능 직접 체험",
      "보안 필터 작동 방식 확인",
      "안전 사용 수칙 숙지",
    ],
  },
];

// ─── Sidebar ──────────────────────────────────────────
function Sidebar({ activeMenu, setActiveMenu }) {
  const menus = [
    { id: "chat", icon: "💬", label: "대화하기" },
    { id: "knowledge", icon: "📚", label: "지식 저장소" },
    { id: "agent", icon: "🤖", label: "에이전트" },
  ];
  return (
    <div style={{
      width: 200, minHeight: "100vh", background: "#111827",
      display: "flex", flexDirection: "column", padding: "16px 0",
      borderRight: "1px solid #1f2937", flexShrink: 0,
    }}>
      <div style={{ padding: "0 16px 20px", borderBottom: "1px solid #1f2937" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <div style={{
            width: 28, height: 28, background: "#22c55e",
            borderRadius: 6, display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: 14, fontWeight: 800, color: "#fff",
          }}>C</div>
          <div>
            <div style={{ color: "#fff", fontSize: 13, fontWeight: 700 }}>CLOVA Studio</div>
            <div style={{
              background: "#22c55e", color: "#fff", fontSize: 9,
              padding: "1px 5px", borderRadius: 3, fontWeight: 700, display: "inline-block",
            }}>GOV</div>
          </div>
        </div>
      </div>

      <div style={{ padding: "12px 8px", flex: 1 }}>
        <div style={{ color: "#6b7280", fontSize: 10, padding: "4px 8px 8px", letterSpacing: 1, textTransform: "uppercase" }}>
          일반 메뉴
        </div>
        {menus.map(m => (
          <div key={m.id} onClick={() => setActiveMenu(m.id)} style={{
            display: "flex", alignItems: "center", gap: 8,
            padding: "8px 10px", borderRadius: 6, cursor: "pointer", marginBottom: 2,
            background: activeMenu === m.id ? "#1f2937" : "transparent",
            color: activeMenu === m.id ? "#fff" : "#9ca3af",
            fontSize: 13, transition: "all 0.15s",
          }}>
            <span style={{ fontSize: 14 }}>{m.icon}</span>
            {m.label}
          </div>
        ))}
      </div>

      <div style={{ padding: "12px 16px", borderTop: "1px solid #1f2937" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <div style={{
            width: 28, height: 28, background: "#374151", borderRadius: "50%",
            display: "flex", alignItems: "center", justifyContent: "center",
            color: "#9ca3af", fontSize: 13,
          }}>👤</div>
          <div>
            <div style={{ color: "#e5e7eb", fontSize: 12, fontWeight: 600 }}>정주환</div>
            <div style={{ color: "#6b7280", fontSize: 11 }}>경제정책국</div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Main Chat Screen ─────────────────────────────────
function ChatScreen() {
  const [mode, setMode] = useState("home"); // home | report-type | report-step | outline | onboarding
  const [selectedType, setSelectedType] = useState(null);
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState(["", "", ""]);
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [selectedScenario, setSelectedScenario] = useState(null);

  const handleAnswer = (val) => {
    const updated = [...answers];
    updated[currentStep] = val;
    setAnswers(updated);
  };

  const nextStep = () => {
    if (currentStep < STEP_QUESTIONS.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      setMode("outline");
    }
  };

  const reset = () => {
    setMode("home");
    setSelectedType(null);
    setCurrentStep(0);
    setAnswers(["", "", ""]);
    setShowOnboarding(false);
    setSelectedScenario(null);
  };

  // ── HOME ──
  if (mode === "home") return (
    <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 32, padding: 40, background: "#f9fafb", position: "relative" }}>
      <div style={{ textAlign: "center" }}>
        <div style={{ fontSize: 22, fontWeight: 700, color: "#111827", marginBottom: 8 }}>
          좋은 오후입니다, 정주환 님
        </div>
        <div style={{ fontSize: 14, color: "#6b7280" }}>AI 모델 또는 에이전트를 선택하여 대화를 시작하세요</div>
      </div>

      {/* 기존 버튼 */}
      <button style={{
        border: "2px solid #e879a0", borderRadius: 8, padding: "10px 24px",
        background: "#fff", color: "#111827", fontSize: 14, cursor: "pointer",
        display: "flex", alignItems: "center", gap: 8,
      }}>
        <span>⚙️</span> 모델 또는 에이전트 선택 <span style={{ color: "#9ca3af" }}>▾</span>
      </button>

      {/* NEW: 업무 유형 선택 카드 ★ */}
      <div style={{ width: "100%", maxWidth: 560 }}>
        <div style={{
          background: "#fff", border: "1px solid #e5e7eb",
          borderRadius: 12, overflow: "hidden", boxShadow: "0 1px 4px rgba(0,0,0,0.06)",
        }}>
          <div style={{ padding: "14px 20px", borderBottom: "1px solid #f3f4f6", background: "#fafafa" }}>
            <div style={{ fontSize: 12, color: "#6b7280", fontWeight: 600, letterSpacing: 0.5, textTransform: "uppercase" }}>
              ✨ 무엇을 도와드릴까요?
            </div>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 1, background: "#f3f4f6" }}>
            {[
              { icon: "📝", label: "보고서 시작하기", action: () => setMode("report-type"), highlight: true },
              { icon: "🔍", label: "자료 찾기", action: () => {} },
              { icon: "💬", label: "그냥 물어보기", action: () => {} },
            ].map((item, i) => (
              <button key={i} onClick={item.action} style={{
                background: item.highlight ? "#fff" : "#fff",
                border: "none", padding: "20px 12px", cursor: "pointer",
                display: "flex", flexDirection: "column", alignItems: "center", gap: 8,
                transition: "background 0.15s",
                outline: item.highlight ? "2px solid #22c55e" : "none",
                outlineOffset: -2,
                position: "relative",
              }}>
                {item.highlight && (
                  <div style={{
                    position: "absolute", top: 6, right: 6,
                    background: "#22c55e", color: "#fff", fontSize: 9,
                    padding: "2px 6px", borderRadius: 4, fontWeight: 700,
                  }}>NEW</div>
                )}
                <span style={{ fontSize: 24 }}>{item.icon}</span>
                <span style={{
                  fontSize: 13, fontWeight: item.highlight ? 700 : 500,
                  color: item.highlight ? "#111827" : "#374151",
                }}>{item.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* 온보딩 시나리오 링크 */}
        <div style={{ marginTop: 12, display: "flex", gap: 8, justifyContent: "center" }}>
          <button onClick={() => setShowOnboarding(true)} style={{
            background: "none", border: "1px solid #d1d5db", borderRadius: 6,
            padding: "6px 14px", fontSize: 12, color: "#6b7280", cursor: "pointer",
          }}>
            📖 처음이신가요? 따라하기 가이드
          </button>
        </div>
      </div>

      {/* 온보딩 모달 */}
      {showOnboarding && (
        <div style={{
          position: "absolute", inset: 0, background: "rgba(0,0,0,0.4)",
          display: "flex", alignItems: "center", justifyContent: "center", zIndex: 100,
        }}>
          <div style={{
            background: "#fff", borderRadius: 16, padding: 32, width: 680,
            maxHeight: "80vh", overflowY: "auto",
          }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
              <div>
                <div style={{ fontSize: 18, fontWeight: 700, color: "#111827" }}>따라하기 온보딩 가이드</div>
                <div style={{ fontSize: 13, color: "#6b7280", marginTop: 4 }}>상황에 맞는 가이드를 선택하세요</div>
              </div>
              <button onClick={() => setShowOnboarding(false)} style={{
                background: "none", border: "none", fontSize: 20, cursor: "pointer", color: "#6b7280",
              }}>✕</button>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 16 }}>
              {ONBOARDING_SCENARIOS.map(sc => (
                <div key={sc.id} onClick={() => setSelectedScenario(sc.id === selectedScenario ? null : sc.id)}
                  style={{
                    border: `2px solid ${selectedScenario === sc.id ? sc.color : "#e5e7eb"}`,
                    borderRadius: 10, overflow: "hidden", cursor: "pointer",
                    transition: "all 0.2s",
                  }}>
                  <div style={{ background: sc.bg, padding: "14px 16px", borderBottom: "1px solid #f3f4f6" }}>
                    <div style={{ fontSize: 13, fontWeight: 700, color: "#111827" }}>{sc.title}</div>
                    <div style={{
                      fontSize: 11, color: sc.color, fontWeight: 600, marginTop: 2,
                      background: sc.color + "22", padding: "2px 6px", borderRadius: 4, display: "inline-block",
                    }}>{sc.subtitle}</div>
                  </div>
                  {selectedScenario === sc.id && (
                    <div style={{ padding: "12px 16px" }}>
                      {sc.steps.map((step, i) => (
                        <div key={i} style={{ display: "flex", gap: 8, marginBottom: 8, alignItems: "flex-start" }}>
                          <div style={{
                            width: 18, height: 18, borderRadius: "50%",
                            background: sc.color, color: "#fff", fontSize: 10,
                            display: "flex", alignItems: "center", justifyContent: "center",
                            flexShrink: 0, marginTop: 1, fontWeight: 700,
                          }}>{i + 1}</div>
                          <span style={{ fontSize: 12, color: "#374151", lineHeight: 1.5 }}>{step}</span>
                        </div>
                      ))}
                      <button style={{
                        width: "100%", marginTop: 8, padding: "8px",
                        background: sc.color, color: "#fff", border: "none",
                        borderRadius: 6, fontSize: 12, cursor: "pointer", fontWeight: 600,
                      }}>시작하기 →</button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );

  // ── REPORT TYPE SELECT ──
  if (mode === "report-type") return (
    <div style={{ flex: 1, padding: 40, background: "#f9fafb", overflowY: "auto" }}>
      <button onClick={reset} style={{ background: "none", border: "none", color: "#6b7280", fontSize: 13, cursor: "pointer", marginBottom: 24, display: "flex", alignItems: "center", gap: 4 }}>
        ← 돌아가기
      </button>
      <div style={{ maxWidth: 560, margin: "0 auto" }}>
        <div style={{ marginBottom: 24 }}>
          <div style={{ fontSize: 20, fontWeight: 700, color: "#111827" }}>📝 보고서 시작하기</div>
          <div style={{ fontSize: 14, color: "#6b7280", marginTop: 6 }}>
            어떤 유형의 보고서를 작성하시나요?
          </div>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
          {REPORT_TYPES.map(rt => (
            <button key={rt.id} onClick={() => { setSelectedType(rt); setMode("report-step"); }}
              style={{
                background: "#fff", border: "1.5px solid #e5e7eb",
                borderRadius: 10, padding: "16px 18px", cursor: "pointer",
                textAlign: "left", transition: "all 0.15s",
                display: "flex", alignItems: "flex-start", gap: 12,
              }}>
              <span style={{ fontSize: 24 }}>{rt.icon}</span>
              <div>
                <div style={{ fontSize: 14, fontWeight: 700, color: "#111827" }}>{rt.label}</div>
                <div style={{ fontSize: 12, color: "#6b7280", marginTop: 2 }}>{rt.desc}</div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );

  // ── STEP QUESTIONS ──
  if (mode === "report-step") return (
    <div style={{ flex: 1, padding: 40, background: "#f9fafb", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
      <div style={{ width: "100%", maxWidth: 480 }}>
        <button onClick={() => setMode("report-type")} style={{ background: "none", border: "none", color: "#6b7280", fontSize: 13, cursor: "pointer", marginBottom: 24, display: "flex", alignItems: "center", gap: 4 }}>
          ← 돌아가기
        </button>

        {/* Progress */}
        <div style={{ display: "flex", gap: 6, marginBottom: 28 }}>
          {STEP_QUESTIONS.map((_, i) => (
            <div key={i} style={{
              flex: 1, height: 4, borderRadius: 2,
              background: i <= currentStep ? "#22c55e" : "#e5e7eb",
              transition: "background 0.3s",
            }} />
          ))}
        </div>

        <div style={{
          background: "#fff", borderRadius: 12, padding: 28,
          border: "1px solid #e5e7eb", boxShadow: "0 1px 4px rgba(0,0,0,0.06)",
        }}>
          <div style={{ display: "flex", gap: 10, alignItems: "flex-start", marginBottom: 20 }}>
            <div style={{
              width: 32, height: 32, borderRadius: "50%", background: "#22c55e",
              display: "flex", alignItems: "center", justifyContent: "center",
              color: "#fff", fontSize: 13, fontWeight: 700, flexShrink: 0,
            }}>AI</div>
            <div style={{
              background: "#f3f4f6", borderRadius: "0 10px 10px 10px",
              padding: "12px 16px", fontSize: 14, color: "#111827", lineHeight: 1.6,
            }}>
              <div style={{ fontSize: 11, color: "#6b7280", marginBottom: 6 }}>
                {selectedType?.label} · 질문 {currentStep + 1}/{STEP_QUESTIONS.length}
              </div>
              {STEP_QUESTIONS[currentStep].label}
            </div>
          </div>

          <textarea
            value={answers[currentStep]}
            onChange={e => handleAnswer(e.target.value)}
            placeholder={STEP_QUESTIONS[currentStep].placeholder}
            rows={3}
            style={{
              width: "100%", border: "1.5px solid #e5e7eb", borderRadius: 8,
              padding: "12px 14px", fontSize: 13, color: "#111827",
              resize: "none", outline: "none", boxSizing: "border-box",
              lineHeight: 1.6, fontFamily: "inherit",
            }}
          />

          <button onClick={nextStep} style={{
            marginTop: 14, width: "100%", padding: "12px",
            background: answers[currentStep] ? "#22c55e" : "#d1d5db",
            color: "#fff", border: "none", borderRadius: 8,
            fontSize: 14, fontWeight: 600, cursor: answers[currentStep] ? "pointer" : "not-allowed",
            transition: "background 0.2s",
          }}>
            {currentStep < STEP_QUESTIONS.length - 1 ? "다음 →" : "목차 생성하기 ✨"}
          </button>
        </div>
      </div>
    </div>
  );

  // ── OUTLINE ──
  if (mode === "outline") return (
    <div style={{ flex: 1, padding: 40, background: "#f9fafb", overflowY: "auto" }}>
      <div style={{ maxWidth: 560, margin: "0 auto" }}>
        <button onClick={reset} style={{ background: "none", border: "none", color: "#6b7280", fontSize: 13, cursor: "pointer", marginBottom: 24 }}>
          ← 처음으로
        </button>

        <div style={{ display: "flex", gap: 10, alignItems: "flex-start", marginBottom: 20 }}>
          <div style={{
            width: 32, height: 32, borderRadius: "50%", background: "#22c55e",
            display: "flex", alignItems: "center", justifyContent: "center",
            color: "#fff", fontSize: 13, fontWeight: 700, flexShrink: 0,
          }}>AI</div>
          <div style={{ flex: 1 }}>
            <div style={{
              background: "#fff", border: "1px solid #e5e7eb", borderRadius: "0 10px 10px 10px",
              padding: "16px 18px", boxShadow: "0 1px 4px rgba(0,0,0,0.06)",
            }}>
              <div style={{ fontSize: 13, color: "#6b7280", marginBottom: 10 }}>
                입력하신 내용을 바탕으로 <strong style={{ color: "#22c55e" }}>{selectedType?.label}</strong> 목차를 생성했습니다.
              </div>
              {OUTLINE_SAMPLE.map((line, i) => (
                <div key={i} style={{
                  fontSize: 13, color: "#111827", padding: "4px 0",
                  paddingLeft: line.startsWith("   ") ? 16 : 0,
                  borderBottom: i < OUTLINE_SAMPLE.length - 1 ? "1px solid #f3f4f6" : "none",
                }}>
                  {line}
                </div>
              ))}
            </div>

            <div style={{ display: "flex", gap: 8, marginTop: 12 }}>
              <button style={{
                flex: 1, padding: "10px", background: "#22c55e", color: "#fff",
                border: "none", borderRadius: 8, fontSize: 13, fontWeight: 600, cursor: "pointer",
              }}>
                이 목차로 시작하기 →
              </button>
              <button style={{
                padding: "10px 16px", background: "#fff", color: "#374151",
                border: "1.5px solid #e5e7eb", borderRadius: 8, fontSize: 13, cursor: "pointer",
              }}>
                수정하기
              </button>
            </div>

            <div style={{
              marginTop: 16, background: "#f0fdf4", border: "1px solid #bbf7d0",
              borderRadius: 8, padding: "12px 14px",
            }}>
              <div style={{ fontSize: 12, color: "#166534", fontWeight: 600, marginBottom: 6 }}>
                📊 예상 토큰 사용량
              </div>
              <div style={{ fontSize: 12, color: "#166534" }}>
                • 자료 조사: ~12,000 토큰<br />
                • 섹션별 초안: ~35,000 토큰<br />
                • 검토/수정: ~8,000 토큰<br />
                <strong>• 총 예상: ~55,000 토큰</strong>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Knowledge Screen ────────────────────────────────
function KnowledgeScreen() {
  return (
    <div style={{ flex: 1, padding: 32, background: "#f9fafb", overflowY: "auto" }}>
      <div style={{ maxWidth: 900, margin: "0 auto" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
          <div>
            <div style={{ fontSize: 20, fontWeight: 700, color: "#111827" }}>서울시교육청 정보공개DB</div>
            <div style={{ display: "flex", gap: 6, marginTop: 6 }}>
              {["교육", "활성"].map(tag => (
                <span key={tag} style={{
                  background: tag === "활성" ? "#dcfce7" : "#f3f4f6",
                  color: tag === "활성" ? "#166534" : "#6b7280",
                  fontSize: 11, padding: "2px 8px", borderRadius: 4, fontWeight: 600,
                }}>{tag}</span>
              ))}
            </div>
          </div>
          <button style={{
            background: "#111827", color: "#fff", border: "none",
            padding: "10px 18px", borderRadius: 8, fontSize: 13, fontWeight: 600, cursor: "pointer",
            display: "flex", alignItems: "center", gap: 6,
          }}>
            + 문서 추가
          </button>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr", gap: 16, marginBottom: 24 }}>
          {[["1,250", "문서 수"], ["15,420", "벡터 수"], ["324", "사용량"], ["2.3GB", "용량"]].map(([val, label]) => (
            <div key={label} style={{
              background: "#fff", border: "1px solid #e5e7eb", borderRadius: 10,
              padding: "16px 20px", textAlign: "center",
            }}>
              <div style={{ fontSize: 22, fontWeight: 700, color: "#111827" }}>{val}</div>
              <div style={{ fontSize: 12, color: "#6b7280", marginTop: 4 }}>{label}</div>
            </div>
          ))}
        </div>

        <div style={{ background: "#fff", border: "1px solid #e5e7eb", borderRadius: 10, overflow: "hidden" }}>
          <div style={{ padding: "14px 20px", borderBottom: "1px solid #f3f4f6", display: "flex", justifyContent: "space-between" }}>
            <div style={{ fontSize: 14, fontWeight: 700, color: "#111827" }}>문서 목록</div>
            <input placeholder="문서 검색..." style={{
              border: "1px solid #e5e7eb", borderRadius: 6, padding: "6px 12px",
              fontSize: 12, outline: "none",
            }} />
          </div>
          {[
            { name: "2024년 서울시교육청 주요업무계획", desc: "2024년도 서울특별시교육청의 주요 업무 추진 계획서", type: "PDF", size: "4.2MB", vec: "1,250", status: "처리완료", date: "1/15/2024" },
            { name: "교육정책 변경사항 공지", desc: "2024년 상반기 교육정책 주요 변경사항에 대한 공지문", type: "DOCX", size: "1.8MB", vec: "850", status: "처리완료", date: "1/12/2024" },
            { name: "예산 집행 현황 보고서", desc: "2023년 4분기 예산 집행 현황 및 분석 보고서", type: "PDF", size: "6.1MB", vec: "-", status: "처리중", date: "1/10/2024" },
          ].map((doc, i) => (
            <div key={i} style={{ padding: "14px 20px", borderBottom: "1px solid #f9fafb", display: "flex", alignItems: "center", gap: 16 }}>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 13, fontWeight: 600, color: "#111827" }}>{doc.name}</div>
                <div style={{ fontSize: 12, color: "#6b7280", marginTop: 2 }}>{doc.desc}</div>
              </div>
              <span style={{
                background: doc.type === "PDF" ? "#fee2e2" : doc.type === "DOCX" ? "#dbeafe" : "#fef9c3",
                color: doc.type === "PDF" ? "#991b1b" : doc.type === "DOCX" ? "#1e40af" : "#854d0e",
                fontSize: 10, padding: "2px 6px", borderRadius: 3, fontWeight: 700,
              }}>{doc.type}</span>
              <span style={{ fontSize: 12, color: "#6b7280", width: 50 }}>{doc.size}</span>
              <span style={{ fontSize: 12, color: "#6b7280", width: 50 }}>{doc.vec}</span>
              <span style={{
                fontSize: 11, padding: "2px 8px", borderRadius: 4, fontWeight: 600,
                background: doc.status === "처리완료" ? "#dcfce7" : "#fef9c3",
                color: doc.status === "처리완료" ? "#166534" : "#854d0e",
              }}>{doc.status}</span>
              <span style={{ fontSize: 12, color: "#9ca3af", width: 70 }}>{doc.date}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── Agent Screen ────────────────────────────────────
function AgentScreen() {
  const patterns = [
    { id: "doc-sum", icon: "📄", label: "문서 요약", desc: "긴 문서를 읽고 핵심 내용을 요약합니다" },
    { id: "doc-qa", icon: "💬", label: "문서검색·질의응답", desc: "질문과 관련된 문서를 검색하여 답변합니다", selected: true },
    { id: "report", icon: "📝", label: "보고서 초안 작성", desc: "데이터를 분석하여 보고서 초안을 작성합니다" },
    { id: "research", icon: "🔍", label: "팀 리서치·연구분석", desc: "주제에 대해 심층적으로 조사하고 분석합니다" },
    { id: "speech", icon: "🎙️", label: "보고 대본 작성·문서작성", desc: "발표용 대본과 스크립트를 작성합니다" },
    { id: "citizen", icon: "👥", label: "대국민 질문 답변·질의응답", desc: "공개적인 질문에 대해 정확하고 친근하게 답변합니다" },
  ];
  const [selected, setSelected] = useState("doc-qa");

  return (
    <div style={{ flex: 1, padding: 32, background: "#f9fafb", overflowY: "auto" }}>
      <div style={{ maxWidth: 800, margin: "0 auto" }}>
        {/* Step Header */}
        <div style={{ display: "flex", gap: 0, marginBottom: 28 }}>
          {[
            { n: 1, label: "메타데이터 및 패턴 선택", desc: "에이전트 기본 정보와 워크플로 패턴을 설정합니다" },
            { n: 2, label: "패턴 상세 설정", desc: "워크플로를 구성하고 각 단계를 설정합니다" },
            { n: 3, label: "리뷰 후 제출", desc: "설정을 확인하고 에이전트를 생성합니다" },
          ].map((step, i) => (
            <div key={i} style={{ flex: 1, display: "flex", alignItems: "flex-start", gap: 10, position: "relative" }}>
              <div style={{
                width: 28, height: 28, borderRadius: "50%", flexShrink: 0,
                background: step.n === 1 ? "#111827" : "#e5e7eb",
                color: step.n === 1 ? "#fff" : "#9ca3af",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: 13, fontWeight: 700,
              }}>{step.n}</div>
              <div>
                <div style={{ fontSize: 12, fontWeight: 700, color: step.n === 1 ? "#111827" : "#9ca3af" }}>{step.label}</div>
                <div style={{ fontSize: 11, color: "#9ca3af", marginTop: 2 }}>{step.desc}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Pattern Select */}
        <div style={{ background: "#fff", border: "1px solid #e5e7eb", borderRadius: 10, padding: 20, marginBottom: 20 }}>
          <div style={{ fontSize: 14, fontWeight: 700, color: "#111827", marginBottom: 14 }}>워크플로 패턴 선택</div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 10 }}>
            {patterns.map(p => (
              <button key={p.id} onClick={() => setSelected(p.id)} style={{
                border: `1.5px solid ${selected === p.id ? "#111827" : "#e5e7eb"}`,
                borderRadius: 8, padding: "12px 14px", cursor: "pointer",
                background: selected === p.id ? "#f9fafb" : "#fff",
                textAlign: "left", transition: "all 0.15s",
              }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span style={{ fontSize: 18 }}>{p.icon}</span>
                  {selected === p.id && <span style={{ color: "#22c55e", fontSize: 14 }}>✓</span>}
                </div>
                <div style={{ fontSize: 12, fontWeight: 700, color: "#111827", marginTop: 6 }}>{p.label}</div>
                <div style={{ fontSize: 11, color: "#6b7280", marginTop: 3, lineHeight: 1.4 }}>{p.desc}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Agent Info + Access */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 20 }}>
          {[
            {
              title: "에이전트 정보",
              desc: "에이전트의 기본 정보를 입력하세요",
              fields: [
                { label: "이름", value: "AI Agent 열린 교육" },
                { label: "설명", value: "서울시교육청 관할 교육기관의 문서를 검색하여 질의응답을 합니다.", textarea: true },
              ],
            },
            {
              title: "접근 권한 설정",
              desc: "에이전트에 접근할 수 있는 구성원을 설정하세요",
              fields: [
                { label: "권한 범위", select: true, value: "대국민 서비스" },
                { label: "", value: "이 에이전트는 대국민 서비스로 공개됩니다.", note: true },
              ],
            },
          ].map((section, i) => (
            <div key={i} style={{
              background: "#fff", border: "2px solid #ef4444",
              borderRadius: 10, padding: 18,
            }}>
              <div style={{ fontSize: 13, fontWeight: 700, color: "#111827", marginBottom: 4 }}>{section.title}</div>
              <div style={{ fontSize: 11, color: "#6b7280", marginBottom: 14 }}>{section.desc}</div>
              {section.fields.map((f, j) => (
                <div key={j} style={{ marginBottom: 12 }}>
                  {f.label && <div style={{ fontSize: 12, color: "#374151", marginBottom: 4, fontWeight: 500 }}>{f.label}</div>}
                  {f.textarea ? (
                    <textarea value={f.value} onChange={() => {}} rows={3} style={{
                      width: "100%", border: "1px solid #e5e7eb", borderRadius: 6,
                      padding: "8px 10px", fontSize: 12, color: "#374151",
                      resize: "none", boxSizing: "border-box", fontFamily: "inherit",
                    }} />
                  ) : f.select ? (
                    <select style={{
                      width: "100%", border: "1px solid #e5e7eb", borderRadius: 6,
                      padding: "8px 10px", fontSize: 12, color: "#374151", background: "#fff",
                    }}>
                      <option>대국민 서비스</option>
                    </select>
                  ) : f.note ? (
                    <div style={{ fontSize: 12, color: "#6b7280", padding: "8px 10px", background: "#f9fafb", borderRadius: 6 }}>{f.value}</div>
                  ) : (
                    <input value={f.value} onChange={() => {}} style={{
                      width: "100%", border: "1px solid #e5e7eb", borderRadius: 6,
                      padding: "8px 10px", fontSize: 12, color: "#374151", boxSizing: "border-box",
                    }} />
                  )}
                </div>
              ))}
            </div>
          ))}
        </div>

        <div style={{ display: "flex", justifyContent: "flex-end", gap: 10 }}>
          <button style={{ padding: "10px 20px", background: "#fff", border: "1px solid #e5e7eb", borderRadius: 8, fontSize: 13, cursor: "pointer" }}>이전</button>
          <button style={{ padding: "10px 20px", background: "#111827", color: "#fff", border: "none", borderRadius: 8, fontSize: 13, fontWeight: 600, cursor: "pointer" }}>다음</button>
        </div>
      </div>
    </div>
  );
}

// ─── App ─────────────────────────────────────────────
export default function App() {
  const [activeMenu, setActiveMenu] = useState("chat");

  return (
    <div style={{ display: "flex", height: "100vh", fontFamily: "'Pretendard', -apple-system, sans-serif", overflow: "hidden" }}>
      <Sidebar activeMenu={activeMenu} setActiveMenu={setActiveMenu} />
      <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>
        {/* Top bar */}
        <div style={{
          height: 44, borderBottom: "1px solid #e5e7eb", background: "#fff",
          display: "flex", alignItems: "center", padding: "0 20px",
          justifyContent: "space-between",
        }}>
          <div style={{ display: "flex", gap: 8 }}>
            {["🗑️ 삭제", "📋 복사"].map(btn => (
              <button key={btn} style={{
                background: "none", border: "none", fontSize: 12,
                color: "#6b7280", cursor: "pointer", padding: "4px 8px",
              }}>{btn}</button>
            ))}
          </div>
          <button style={{
            background: "none", border: "none", fontSize: 16,
            color: "#6b7280", cursor: "pointer",
          }}>ℹ️</button>
        </div>

        {/* Tab indicator */}
        <div style={{ background: "#fff", borderBottom: "1px solid #f3f4f6", padding: "0 20px", display: "flex", gap: 0 }}>
          {[
            { id: "chat", label: "💬 대화하기" },
            { id: "knowledge", label: "📚 지식 저장소" },
            { id: "agent", label: "🤖 에이전트 생성" },
          ].map(tab => (
            <button key={tab.id} onClick={() => setActiveMenu(tab.id)} style={{
              padding: "10px 16px", border: "none", background: "none",
              fontSize: 12, fontWeight: 600, cursor: "pointer",
              borderBottom: activeMenu === tab.id ? "2px solid #22c55e" : "2px solid transparent",
              color: activeMenu === tab.id ? "#111827" : "#9ca3af",
            }}>{tab.label}</button>
          ))}
        </div>

        {/* Content */}
        <div style={{ flex: 1, overflow: "auto", display: "flex" }}>
          {activeMenu === "chat" && <ChatScreen key="chat" />}
          {activeMenu === "knowledge" && <KnowledgeScreen />}
          {activeMenu === "agent" && <AgentScreen />}
        </div>
      </div>
    </div>
  );
}
