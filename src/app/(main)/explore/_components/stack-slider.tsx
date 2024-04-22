export function StackSlider() {
  return (
    <div className="flex gap-8 md:hidden">
      <div className="flex-1">
        <div>
          <h5 className="mb-4 text-center text-sm font-semibold tracking-tighter text-[#a594fd]">
            INSIGHTS
          </h5>
          <div>
            <h3 className="mb-4 text-center text-3xl font-semibold md:text-4xl lg:text-5xl xl:text-7xl">
              Find inspiration.
              <br />
              Insights for you.
            </h3>
            <p className="text-balance text-center font-light text-muted-foreground">
              You can explore fresh ideas alongside our rapidly expanding group
              of members.
            </p>
          </div>
        </div>
      </div>
      <div className="flex-1">
        <div></div>
      </div>
    </div>
  );
}
