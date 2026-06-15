export const RecommendationCard = ({ data, crop }) => {
  const recommendations = data.recommendations || [];
  const mainRec = recommendations[0];
  const otherRecs = recommendations.slice(1);

  return (
    <div className="bg-primary-container text-on-primary-container rounded-xl p-6 border border-primary relative">
      <div className="flex items-center gap-2 mb-4">
        <div className="bg-primary p-2 rounded-lg">
          <span className="material-symbols-outlined text-white" style={{ fontVariationSettings: "'FILL' 1" }}>
            auto_awesome
          </span>
        </div>
        <h3 className="font-headline-sm text-headline-sm">AI Recommendation</h3>
      </div>
      <div className="mb-4">
        {crop && (
          <span className="inline-block bg-primary text-primary-fixed px-3 py-1 rounded-full font-label-sm mb-3">
            Crop: {crop.charAt(0).toUpperCase() + crop.slice(1)}
          </span>
        )}
        {mainRec && (
          <p className="font-body-lg text-body-lg leading-relaxed">
            {mainRec.description}
            {mainRec.action && (
              <span className="font-bold underline decoration-secondary ml-1">
                {mainRec.action}
              </span>
            )}
          </p>
        )}
      </div>
      {otherRecs.length > 0 && (
        <div className="space-y-3 mt-4 pt-4 border-t border-primary/30">
          {otherRecs.slice(0, 2).map((rec, idx) => (
            <div key={idx} className="flex items-start gap-3">
              <span className="material-symbols-outlined text-on-primary-container text-sm">
                {rec.type === 'pest_alert' ? 'pest_control' : 'info'}
              </span>
              <p className="text-sm">{rec.description}</p>
            </div>
          ))}
        </div>
      )}
      <button className="w-full bg-surface-container-lowest text-primary font-label-md py-3 rounded-xl hover:bg-primary-fixed transition-colors flex items-center justify-center gap-2 mt-6">
        View Detailed Insights
        <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
      </button>
    </div>
  );
};