package com.example.cs455020su1jhansenserverjava.services;

import com.example.cs455020su1jhansenserverjava.models.Widget;
// import com.example.cs455020su1jhansenserverjava.repositories.WidgetRepository;
// import org.springframework.beans.factory.annotation.Autowired;
import java.util.Collections;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class WidgetService {
  // @Autowired
  // WidgetRepository repository;

  List<Widget> widgets = new ArrayList<>();

  public Widget createWidget(Widget newWidget) {
    newWidget.setId(widgets.size() * 20);
    int order = this.findWidgetsForTopic(newWidget.getTopicId()).size();
    newWidget.setWidgetOrder(order);
    this.widgets.add(newWidget);
    return newWidget;
  }

  public List<Widget> findWidgetsForTopic(String tid) {
    ArrayList<Widget> results = new ArrayList<>();
    for (Widget w : widgets) {
      if (w.getTopicId().equals(tid)) {
        results.add(w);
      }
    }
    Collections.sort(results);
    return results;
  }

  /*
  public List<Widget> findWidgetsForTopic(String tid) {
    return (List<Widget>)repository.findAll();
        List<Widget> result = new ArrayList<Widget>();

        for (Widget w: widgets) {
            if(w.getTopicId().equals(tid)) {
                result.add(w);
            }
        }

        return result;
  }
  */

  public Widget updateWidget(Integer widgetId, Widget updatedWidget) {
    for(int i=0; i<widgets.size(); i++) {
      if(widgets.get(i).getId().equals(widgetId)) {
        updatedWidget.setId(widgetId);
        widgets.set(i, updatedWidget);
        return updatedWidget;
      }
    }
    return null;
  }

  public List<Widget> deleteWidget(Integer wid) {
    List<Widget> result = new ArrayList<>();
    for (Widget w: widgets) {
      if(!w.getId().equals(wid)) {
        result.add(w);
      }
    }
    this.widgets = result;
    return result;
  }

  public Widget findWidgetById(Integer wid) {
    for (Widget w: widgets) {
      if(w.getId().equals(wid)) {
        return w;
      }
    }
    return null;
  }

  public List<Widget> findAllWidgets() {
    return this.widgets;
  }

  public List<Widget> reorderUp(int wid) {
    List<Widget> widgets = this.findWidgetsForTopic(this.findWidgetById(wid).getTopicId());
    Widget reorder = null;
    for (int i = 1; i < widgets.size(); i++) {
      if (widgets.get(i).getId() == wid) {
        reorder = widgets.get(i);
      }
    }
    if (reorder == null) {
      return widgets;
    } else {
      int order = reorder.getWidgetOrder();
      reorder.setWidgetOrder(order - 1);
      widgets.get(order - 1).setWidgetOrder(order);
    }
    Collections.sort(widgets);
    return widgets;
  }

  public List<Widget> reorderDown(int wid) {
    List<Widget> widgets = this.findWidgetsForTopic(this.findWidgetById(wid).getTopicId());
    Widget reorder = null;
    for (int i = 0; i < widgets.size() - 1; i++) {
      if (widgets.get(i).getId() == wid) {
        reorder = widgets.get(i);
      }
    }
    if (reorder == null) {
      return widgets;
    } else {
      int order = reorder.getWidgetOrder();
      reorder.setWidgetOrder(order + 1);
      widgets.get(order + 1).setWidgetOrder(order);
    }
    Collections.sort(widgets);
    return widgets;
  }
}