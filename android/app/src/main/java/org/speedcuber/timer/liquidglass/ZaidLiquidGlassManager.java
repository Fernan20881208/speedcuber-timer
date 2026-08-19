package org.speedcuber.timer.liquidglass;

import androidx.annotation.NonNull;

import com.example.liquidglass.GlassMaterial;
import com.example.liquidglass.LiquidGlassView;

import com.facebook.react.uimanager.PixelUtil;
import com.facebook.react.uimanager.ThemedReactContext;
import com.facebook.react.uimanager.ViewGroupManager;
import com.facebook.react.uimanager.annotations.ReactProp;

public class ZaidLiquidGlassManager
        extends ViewGroupManager<LiquidGlassView> {

    public static final String REACT_CLASS =
            "ZaidLiquidGlass";

    @NonNull
    @Override
    public String getName() {
        return REACT_CLASS;
    }

    @NonNull
    @Override
    protected LiquidGlassView createViewInstance(
            @NonNull ThemedReactContext context
    ) {
        LiquidGlassView view =
                new LiquidGlassView(context);

        view.setEnableDynamicBackground(true);
        view.setEnableSensorHighlight(true);
        view.setEnableAdaptiveTint(true);

        view.setMaterial(
                GlassMaterial.REGULAR
        );

        return view;
    }

    @ReactProp(
            name = "dynamicBackground",
            defaultBoolean = true
    )
    public void setDynamicBackground(
            LiquidGlassView view,
            boolean enabled
    ) {
        view.setEnableDynamicBackground(enabled);
    }

    @ReactProp(
            name = "sensorHighlight",
            defaultBoolean = true
    )
    public void setSensorHighlight(
            LiquidGlassView view,
            boolean enabled
    ) {
        view.setEnableSensorHighlight(enabled);
    }

    @ReactProp(
            name = "adaptiveTint",
            defaultBoolean = true
    )
    public void setAdaptiveTint(
            LiquidGlassView view,
            boolean enabled
    ) {
        view.setEnableAdaptiveTint(enabled);
    }

    @ReactProp(
            name = "cornerRadius",
            defaultFloat = 28f
    )
    public void setCornerRadius(
            LiquidGlassView view,
            float dp
    ) {
        view.setCornerRadius(
                PixelUtil.toPixelFromDIP(dp)
        );
    }

    @ReactProp(
            name = "refractionHeight",
            defaultFloat = 66f
    )
    public void setRefractionHeight(
            LiquidGlassView view,
            float dp
    ) {
        view.setRefractionHeight(
                PixelUtil.toPixelFromDIP(dp)
        );
    }

    @ReactProp(
            name = "bevelWidth",
            defaultFloat = 14f
    )
    public void setBevelWidth(
            LiquidGlassView view,
            float dp
    ) {
        view.setBevelWidth(
                PixelUtil.toPixelFromDIP(dp)
        );
    }

    @ReactProp(
            name = "dispersionStrength",
            defaultFloat = 0.10f
    )
    public void setDispersionStrength(
            LiquidGlassView view,
            float value
    ) {
        view.setDispersionStrength(value);
    }

    @ReactProp(
            name = "material"
    )
    public void setMaterial(
            LiquidGlassView view,
            String material
    ) {
        if (
            material != null &&
            material.equalsIgnoreCase("clear")
        ) {
            view.setMaterial(
                    GlassMaterial.CLEAR
            );
        } else {
            view.setMaterial(
                    GlassMaterial.REGULAR
            );
        }
    }
        }
